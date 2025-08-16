import React, { type JSX } from "react"
import { AudioCtx, type IAudioContext } from "../context/AudioContext";

interface IAudioProvider extends IAudioContext {
  children: JSX.Element;
}

export const AudioProvider = ( props: IAudioProvider ) => {
  return <AudioCtx value={props}> {props.children} </AudioCtx>
}