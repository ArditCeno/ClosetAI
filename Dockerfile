FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app/backend

COPY . .
RUN mvn clean package -DskipTests


FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY package*.json yarn.lock* ./
RUN npm install
COPY . .
RUN npm run build


FROM openjdk:17-jdk-slim
WORKDIR /app


COPY --from=backend-build /app/backend/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
