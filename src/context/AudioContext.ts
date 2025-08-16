import { createContext } from "react";

export interface IAudioContext {
  data: AudioData | null;
  node: AudioNode | null;
  context: AudioContext | null;
  track: Track| null;
}

export const AudioCtx = createContext<IAudioContext>({
  data: null,
  node: null,
  context: null,
  track: null
});