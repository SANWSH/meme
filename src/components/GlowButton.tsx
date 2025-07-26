import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import Glow from '../assets/Glow.svg';
import PlayButton from '../assets/Button_Play.svg';
import PauseButton from '../assets/Button_Pause.svg';

interface GlowButtonProps {
  isPlaying: boolean;
  togglePlay: () => void;
  audioContext: AudioContext | null;
  source: MediaElementAudioSourceNode | null;
}

const GlowButton: React.FC<GlowButtonProps> = ({ isPlaying, togglePlay, audioContext, source }) => {
  const [glowSize, setGlowSize] = useState(1);

  //#region References
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataBufferRef = useRef<Uint8Array | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  //#endregion

  useEffect(() => {
    if (audioContext && source && !analyserRef.current) {
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      analyserRef.current = analyser;
      dataBufferRef.current = new Uint8Array(analyser.fftSize);
    }

    return () => {
      if (source && analyserRef.current) {
        source.disconnect(analyserRef.current);
      }
      analyserRef.current = null;
    };
  }, [audioContext, source]);

  const updateGlow = useCallback(() => {
    if (!analyserRef.current || !dataBufferRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(updateGlow);
      return;
    }
    const analyser = analyserRef.current;
    const dataArray = dataBufferRef.current;

    analyser.getByteTimeDomainData(dataArray);

    let sumSquares = 0.0;
    for (const amplitude of dataArray) {
      const normSample = (amplitude / 128.0) - 1.0;
      sumSquares += normSample * normSample;
    }
    
    const rms = Math.sqrt(sumSquares / dataArray.length);
    setGlowSize(1 + rms * 2);

    animationFrameIdRef.current = requestAnimationFrame(updateGlow);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animationFrameIdRef.current = requestAnimationFrame(updateGlow);
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      setGlowSize(1);
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, updateGlow]);

  return (
    <div className="play-button-container">
      <img src={Glow} alt="Glow" className="glow" style={{ transform: `scale(${glowSize})` }} />
      <button onClick={togglePlay} className="play-pause-button">
        <img src={isPlaying ? PauseButton : PlayButton} alt="Play/Pause" />
      </button>
    </div>
  );
};

export default memo(GlowButton); 