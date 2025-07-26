import { useState, useEffect, useRef, useCallback } from 'react';
import { musicTracks } from '../music';

export interface Track {
  src: string;
  name: string;
}

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState(1);
  const [sourceNode, setSourceNode] = useState<MediaElementAudioSourceNode | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playTrack = useCallback((track: Track) => {
    if (audioRef.current) {
      audioRef.current.src = track.src;
      audioRef.current.onended = () => playRandomTrack();
      audioRef.current.play();
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  }, []);

  const playRandomTrack = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * musicTracks.length);
    const nextTrack = musicTracks[randomIndex];
    playTrack(nextTrack);
  }, [playTrack]);

  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    if (!audioContextRef.current) {
      const context = new AudioContext();
      audioContextRef.current = context;
      
      const source = context.createMediaElementSource(audioRef.current);
      source.connect(context.destination);
      setSourceNode(source);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioContextRef.current) {
      initializeAudio();
      playRandomTrack();
    } else if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPlaying(true);
    }
  }, [isPlaying, initializeAudio, playRandomTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    const audioContext = audioContextRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return {
    isPlaying,
    currentTrack,
    volume,
    sourceNode,
    audioContext: audioContextRef.current,
    togglePlay,
    playTrack,
    playRandomTrack,
    setVolume,
  };
}; 