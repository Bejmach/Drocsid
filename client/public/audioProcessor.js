class AudioProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const input = inputs[0];  // First input channel

    if (input && input.length > 0) {
      const audioBuffer = input[0];  // Assuming the first channel is valid
      this.port.postMessage(audioBuffer);  // Send audio buffer to main thread
    }

    return true;  // Continue processing
  }
}

registerProcessor("audio-processor", AudioProcessor);
