import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Background from './assets/Background.png';
import DownloadIcon from './assets/Download.svg';
import PlaylistIcon from './assets/Playlist.svg';
import DiceIcon from './assets/dice-six-faces-six.svg';
import { getDisplayName } from './config/nameConfig';
import MusicModal from './components/MusicModal';
import PersonalInfoModal from './components/PersonalInfoModal';
import GlowButton from './components/GlowButton';
import { useAudioPlayer, type Track } from './hooks/useAudioPlayer';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);
  const volumeIntervalRef = useRef<number | null>(null);

  // Heavy hook
  const {
    isPlaying,
    currentTrack,
    volume,
    sourceNode,
    audioContext,
    togglePlay,
    playTrack,
    setVolume,
    playRandomTrack,
  } = useAudioPlayer();

  const changeVolume = useCallback((amount: number) => {
    setVolume(prev => Math.max(0, Math.min(1, prev + amount)));
  }, [setVolume]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement?.tagName.toUpperCase() === 'INPUT') return;
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        changeVolume(0.05);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        changeVolume(-0.05);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeVolume]);

  const handleSelectTrack = (track: Track) => {
    playTrack(track);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (!isPlaying) {
      togglePlay();
    }
  };

  const handleDownload = () => {
    if (currentTrack) {
      const link = document.createElement('a');
      link.href = currentTrack.src;
      link.download = `${currentTrack.name}.ogg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${Background})` }}>
      <div className="vignette-overlay"></div>
       {isModalOpen && <MusicModal onSelectTrack={handleSelectTrack} onClose={handleModalClose} />}
       {isPersonalModalOpen && <PersonalInfoModal onClose={() => setIsPersonalModalOpen(false)} />}
      <div className="credits">
        All rights belong to <a href="https://www.croteam.com/" target="_blank" rel="noopener noreferrer">Croteam</a>. Music by <a href="https://www.youtube.com/@DMJ" target="_blank" rel="noopener noreferrer">Damjan Mravunac</a>
      </div>
      <div className="flicker-overlay"></div>
      <GlowButton
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        audioContext={audioContext}
        source={sourceNode}
      />
      <div className="bottom-controls">
        <div className="left-controls">
          <div className="button-container">
            <button onClick={() => setIsModalOpen(true)} className="icon-button">
              <img src={PlaylistIcon} alt="Playlist" />
            </button>
            <div className="action-buttons">
              <button onClick={handleDownload} className="icon-button" disabled={!isPlaying}>
                <img src={DownloadIcon} alt="Download" />
              </button>
              <button onClick={playRandomTrack} className="icon-button" disabled={!isPlaying}>
                <img src={DiceIcon} alt="Next Random" />
              </button>
            </div>
          </div>
          <div className="track-info-container">
            {isPlaying ? (
              <div className="track-name">{getDisplayName(currentTrack?.name || '')}</div>
            ) : (
              <h1>Push Play</h1>
            )}
          </div>
        </div>
        <div className="volume-controls">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="volume-slider vertical"
          />
        </div>
      </div>
      <a onClick={() => setIsPersonalModalOpen(true)} className="personal-link" style={{position: 'absolute', bottom: '20px', right: '20px', color: 'white', cursor: 'pointer'}}>About Me</a>
    </div>
  );
}

export default App;
