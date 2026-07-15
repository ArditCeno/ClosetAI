import { useEffect, useRef, useState, useCallback } from 'react';
import { View, Platform } from 'react-native';

interface WebCameraProps {
  onCapture: (base64: string) => void;
  scanning?: boolean;
}

export default function WebCamera({ onCapture, scanning }: WebCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    async function startCamera() {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        });
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err: any) {
        setError(err.message || 'Camera access denied');
      }
    }
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const capture = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.9);
    onCapture(base64);
  }, [onCapture]);

  if (Platform.OS !== 'web') return null;

  return (
    <View style={{ flex: 1, position: 'relative', overflow: 'hidden', background: '#000' }}>
      <video
        ref={videoRef as any}
        autoPlay
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <canvas ref={canvasRef as any} style={{ display: 'none' }} />
      {scanning && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px solid rgba(91,141,255,0.4)',
            borderRadius: 16,
            margin: 40,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '20%',
              right: '20%',
              height: 2,
              background: '#5B8DFF',
              boxShadow: '0 0 10px #5B8DFF',
              animation: 'scanLine 2.5s ease-in-out infinite',
            }}
          />
          {['top', 'bottom'].map((v) =>
            ['left', 'right'].map((h) => (
              <div
                key={`${v}-${h}`}
                style={{
                  position: 'absolute',
                  [v]: -1,
                  [h]: -1,
                  width: 24,
                  height: 24,
                  borderColor: '#5B8DFF',
                  borderTopWidth: v === 'top' ? 2 : 0,
                  borderBottomWidth: v === 'bottom' ? 2 : 0,
                  borderLeftWidth: h === 'left' ? 2 : 0,
                  borderRightWidth: h === 'right' ? 2 : 0,
                  borderTopLeftRadius: v === 'top' && h === 'left' ? 8 : 0,
                  borderTopRightRadius: v === 'top' && h === 'right' ? 8 : 0,
                  borderBottomLeftRadius: v === 'bottom' && h === 'left' ? 8 : 0,
                  borderBottomRightRadius: v === 'bottom' && h === 'right' ? 8 : 0,
                }}
              />
            ))
          )}
        </div>
      )}
      <style>{`
        @keyframes scanLine {
          0%, 100% { top: 10%; }
          50% { top: 80%; }
        }
      `}</style>
    </View>
  );
}
