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

        const audioContext = new AudioContext();
        audioContextRef.current = audioContext;

        await audioContext.audioWorklet.addModule("/audioProcessor.js");
        const workletNode = new AudioWorkletNode(audioContext, "audio-processor");
        workletNodeRef.current = workletNode;

        const source = audioContext.createMediaStreamSource(stream);
        source.connect(workletNode);
        workletNode.connect(audioContext.destination);

        workletNode.port.onmessage = (event) => {
          sendAudio(event.data);
        };
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    };

    startRecording();

    return () => {
      mediaStreamRef.current?.getTracks().forEach(track => track.stop());
      workletNodeRef.current?.disconnect();
      audioContextRef.current?.close();
    };
  }, [isRecording]);

  return { start: () => setIsRecording(true), stop: () => setIsRecording(false) };
}
