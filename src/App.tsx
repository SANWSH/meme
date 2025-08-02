import { useState, useEffect, useCallback } from 'react';
import './App.css';
import Background from './assets/Background.png';
import DownloadIcon from './assets/Download.svg';
import PlaylistIcon from './assets/Playlist.svg';
import DiceIcon from './assets/dice.svg';
import { getDisplayName } from './config/nameConfig';
import MusicModal from './components/MusicModal';
import PersonalInfoModal from './components/PersonalInfoModal';
import GlowButton from './components/GlowButton';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPersonalModalOpen, setIsPersonalModalOpen] = useState(false);

  const {
    isPlaying,
    currentTrack,
    volume,
    sourceNode,
    audioContext,
    playlist,
    togglePlay,
    playTrack,
    setVolume,
    playRandomTrack,
    setPlaylist,
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

  const handleModalClose = () => {
    setIsModalOpen(false);
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
       {isModalOpen && <MusicModal 
       onSave={setPlaylist} 
       onClose={handleModalClose} 
       currentPlaylist={playlist} 
       playTrack={playTrack} />}
       {isPersonalModalOpen && <PersonalInfoModal onClose={() => setIsPersonalModalOpen(false)} />}
      <div className="credits">
        { t('credits.rights.pt1') }&nbsp;
        <a href="https://www.croteam.com/" target="_blank" rel="noopener noreferrer">{ t('credits.rights.pt2') }</a>.&nbsp;
        { t('credits.rights.pt3') }&nbsp;
        <a href="https://www.youtube.com/@DMJ" target="_blank" rel="noopener noreferrer">{ t('credits.rights.pt4') }</a>&nbsp;
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
              <h1>{ t("controls.pushplay") }</h1>
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
      <a 
      onClick={() => setIsPersonalModalOpen(true)} 
      className="personal-link" 
      style={{position: 'absolute', bottom: '20px', right: '20px', color: 'white', cursor: 'pointer'}}>
        { t("credits.index")}
      </a>
    </div>
  );
}

export default App;
