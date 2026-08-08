FROM maven:3.9.6-eclipse-temurin-21 AS backend-build
WORKDIR /app/backend

COPY backend/pom.xml .
RUN mvn dependency:go-offline -B

COPY backend/src ./src
RUN mvn clean package -B -DskipTests -Dorg.slf4j.simpleLogger.defaultLogLevel=warn

FROM node:20-alpine AS frontend-build
WORKDIR /app/mobile

COPY mobile/package*.json ./
RUN npm install --legacy-peer-deps

COPY mobile/ .

RUN mkdir -p node_modules/react-native-css-interop/.cache && \
    touch node_modules/react-native-css-interop/.cache/web.css && \
    touch node_modules/react-native-css-interop/.cache/native.css && \
    chmod -R 777 node_modules/react-native-css-interop && \
    chmod -R 777 node_modules/.cache 2>/dev/null || true

ENV CI=false
ENV NODE_ENV=production

RUN npx expo export --platform web

FROM eclipse-temurin:21-jre-alpine

RUN apk add --no-cache python3 py3-pip supervisor

WORKDIR /app

COPY ai-service/requirements.txt ./ai-service/requirements.txt
RUN python3 -m venv /app/venv && \
    /app/venv/bin/pip install --no-cache-dir -r ./ai-service/requirements.txt

COPY ai-service/ ./ai-service/

COPY --from=backend-build /app/backend/target/*.jar app.jar
COPY --from=frontend-build /app/mobile/dist ./static

RUN mkdir -p /etc/supervisor/conf.d && \
    echo '[supervisord]' > /etc/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisord.conf && \
    echo '[program:spring-boot]' >> /etc/supervisord.conf && \
    echo 'command=java -Dserver.port=10000 -jar /app/app.jar' >> /etc/supervisord.conf && \
    echo '[program:fastapi]' >> /etc/supervisord.conf && \
    echo 'command=/app/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000' >> /etc/supervisord.conf && \
    echo 'directory=/app/ai-service' >> /etc/supervisord.conf

ENV PORT=10000
EXPOSE 10000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
