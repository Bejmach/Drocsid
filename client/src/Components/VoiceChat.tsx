import React, { useEffect, useRef } from "react";
import { useMicrophone } from "../hooks/MicRecording";

const ws = new WebSocket("ws://localhost:4000");

export const VoiceChat: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const { start, stop } = useMicrophone((audioData) => {
    ws.send(audioData); // Send audio data to WebSocket server
  });

  useEffect(() => {
    ws.onmessage = (event) => {
      const audioBuffer = event.data;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      audioContextRef.current.decodeAudioData(audioBuffer, (decodedData) => {
        const source = audioContextRef.current!.createBufferSource();
        source.buffer = decodedData;
        source.connect(audioContextRef.current!.destination);
        source.start();
      });
    };
  }, []);

  return (
    <div>
      <button onClick={start}>🎤 Start Talking</button>
      <button onClick={stop}>🔇 Stop Talking</button>
    </div>
  );
};
