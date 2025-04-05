import React, { useEffect, useRef } from "react";
import { useMicrophone } from "../hooks/MicRecording";

// Set up WebSocket
const ws = new WebSocket("ws://localhost:4000");
ws.binaryType = "arraybuffer";

export const VoiceChat: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackTimeRef = useRef<number>(0);

  const { start, stop } = useMicrophone((audioData) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(audioData.buffer);
      console.log("Sent audio chunk:", audioData.length);
    }
  });

  useEffect(() => {
    ws.onmessage = (event) => {
      const arrayBuffer = event.data;
      const floatArray = new Float32Array(arrayBuffer);

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        playbackTimeRef.current = audioContextRef.current.currentTime;
      }

      const audioCtx = audioContextRef.current;
      const buffer = audioCtx.createBuffer(1, floatArray.length, audioCtx.sampleRate);
      buffer.copyToChannel(floatArray, 0);

      // Smooth scheduling
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      const startTime = Math.max(playbackTimeRef.current, now + 0.05); // small buffer delay
      source.start(startTime);
      playbackTimeRef.current = startTime + buffer.duration;

      console.log(
        `Scheduled buffer at ${startTime.toFixed(3)}s (ctx: ${now.toFixed(3)}s, duration: ${buffer.duration.toFixed(3)}s)`
      );
    };
  }, []);

  return (
    <div>
    <button onClick={start}>🎤 Start Talking</button>
    <button onClick={stop}>🔇 Stop Talking</button>
    </div>
  );
};
