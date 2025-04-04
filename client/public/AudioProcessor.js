class AudioProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    if (input?.length) {
      this.port.postMessage(input[0]); // Send the first channel's audio data
    }
    return true; // Continue processing
  }
}

registerProcessor("audio-processor", AudioProcessor);
