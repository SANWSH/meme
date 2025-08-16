import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { musicTracks } from '../music';
import { disabledTracks as defaultDisabledTracks } from '../config/disabled';
import { trackSongPlay } from '../utils/analytics';
import { AudioCtx } from '../context/AudioContext';

const getInitialPlaylist = (): Track[] => {
  const savedDisabled = localStorage.getItem('disabledTracks');
  if (savedDisabled) {
    const disabled = new Set(JSON.parse(savedDisabled));
    return musicTracks.filter(track => !disabled.has(track.name));
  }
  return musicTracks.filter(track => !defaultDisabledTracks.includes(track.name));
};

const getInitialVolume = (): number => {
  const savedVolume = localStorage.getItem('volume');
  if (savedVolume) {
    const parsedVolume = parseFloat(savedVolume);
    if (!isNaN(parsedVolume) && parsedVolume >= 0 && parsedVolume <= 1) {
      return parsedVolume;
    }
  }
  return 1;
};


export const useAudioPlayer = () => {
  const ctx = useContext(AudioCtx);

  const [playlist, setPlaylist] = useState<Track[]>(getInitialPlaylist);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [volume, setVolume] = useState<number>(getInitialVolume);
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
      trackSongPlay(track.name);
      ctx.track = track;
    }
  }, []);

  const playRandomTrack = useCallback(() => {
    if (playlist.length === 0) return;
    const randomIndex = Math.floor(Math.random() * playlist.length);
    const nextTrack = playlist[randomIndex];
    playTrack(nextTrack);
  }, [playTrack, playlist]);

  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    
    if (!audioContextRef.current) {
      const context = new AudioContext();
      ctx.context = context; // test fill context
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
    localStorage.setItem('volume', volume.toString());
  }, [volume]);

  return {
    isPlaying,
    currentTrack,
    volume,
    sourceNode,
    audioContext: audioContextRef.current,
    playlist,
    togglePlay,
    playTrack,
    playRandomTrack,
    setVolume,
    setPlaylist,
  };
}; 