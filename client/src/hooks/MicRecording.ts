import { useEffect, useState, useRef } from "react";

export function useMicrophone(sendAudio: (data: Float32Array) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);

  useEffect(() => {
    if (!isRecording) return;

    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;

        const audioContext = new AudioContext(); // Default sample rate (~48kHz)
  audioContextRef.current = audioContext;

  await audioContext.audioWorklet.addModule("/audioProcessor.js");

  const workletNode = new AudioWorkletNode(audioContext, "audio-processor");
  workletNodeRef.current = workletNode;

  const source = audioContext.createMediaStreamSource(stream);
  source.connect(workletNode);

  let bufferQueue: Float32Array[] = [];
  let bufferSize = 0;
  const BATCH_SIZE = 4096;

  workletNode.port.onmessage = (event) => {
    const chunk = event.data as Float32Array;
    bufferQueue.push(chunk);
    bufferSize += chunk.length;

    if (bufferSize >= BATCH_SIZE) {
      const merged = new Float32Array(bufferSize);
      let offset = 0;
      for (const buf of bufferQueue) {
        merged.set(buf, offset);
        offset += buf.length;
      }

      sendAudio(merged);
      bufferQueue = [];
      bufferSize = 0;
    }
  };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startRecording();

    return () => {
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      workletNodeRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [isRecording]);

  return {
    start: () => setIsRecording(true),
    stop: () => setIsRecording(false),
  };
}
