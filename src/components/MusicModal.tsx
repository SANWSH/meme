import React, { useState, useMemo } from 'react';
import './MusicModal.css';
import { musicTracks } from '../music';
import { getDisplayFolder, getDisplayTrack } from '../config/nameConfig';
import { disabledTracks as defaultDisabledTracks } from '../config/disabled';
import { trackCategories } from '../config/categoryConfig';
import { tabs } from '../config/categoryConfig';

interface MusicModalProps {
  onSave: (playlist: Track[]) => void;
  onClose: () => void;
  currentPlaylist: Track[];
  playTrack: (track: Track) => void;
}

const MusicModal: React.FC<MusicModalProps> = ({ onSave, onClose, currentPlaylist, playTrack }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [disabled, setDisabled] = useState<Set<string>>(() => {
    const savedDisabled = localStorage.getItem('disabledTracks');
    if (savedDisabled) {
      return new Set(JSON.parse(savedDisabled));
    }
    return new Set(defaultDisabledTracks);
  });

  const toggleTrack = (trackName: string) => {
    setDisabled(prev => {
      const newDisabled = new Set(prev);
      if (newDisabled.has(trackName)) {
        newDisabled.delete(trackName);
      } else {
        newDisabled.add(trackName);
      }
      return newDisabled;
    });
  };

  const handleSave = () => {
    const newPlaylist = musicTracks.filter(track => !disabled.has(track.name));
    localStorage.setItem('disabledTracks', JSON.stringify(Array.from(disabled)));
    onSave(newPlaylist);
    onClose();
  };

  const handleReset = () => {
    const defaultDisabled = new Set(defaultDisabledTracks);
    const newPlaylist = musicTracks.filter(track => !defaultDisabled.has(track.name));
    localStorage.removeItem('disabledTracks');
    setDisabled(defaultDisabled);
    onSave(newPlaylist);
  };

  const handleDisableAll = () => {
    setDisabled(new Set(musicTracks.map(track => track.name)));
  };
  
  const tracksGroup = useMemo(() => {
    const groups: { [key: string]: Track[] } = {};
    musicTracks.forEach(track => {
      const [folder, trackName] = track.name.split(' - ');
      if (!groups[folder]) {
        groups[folder] = [];
      }
      groups[folder].push({ 
        ...track, 
        name: trackName, 
        disabled: disabled.has(track.name), 
        category: trackCategories[folder] || 'Misc',
        src: track.src
      });
    });

    if (activeTab !== 'All') {
      const filteredGroups: { [key: string]: Track[] } = {};
      for (const folder in groups) {
        if (trackCategories[folder] === activeTab) {
          filteredGroups[folder] = groups[folder];
        }
      }
      return filteredGroups;
    }
    return groups;
  }, [activeTab, disabled]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Playlist</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-tabs">
          {tabs.map((tab) => (
            <button 
            key={tab} 
            className={activeTab === tab ? 'active' : ''} 
            onClick={() => setActiveTab(tab)}>
            {tab}
            </button>
          ))}
        </div>
        <div className="track-list">
          {Object.keys(tracksGroup).map(folder => (
            <div key={folder} className="track-group">
              <h3>{getDisplayFolder(folder)}</h3>
              <div className="track-cards">
                {tracksGroup[folder].map(track => (
                  <div className={`track-card ${track.disabled ? 'disabled' : ''}`}>
                  <div 
                  key={track.name} 
                  className='track-card-name'
                  onClick={() => 
                  toggleTrack(`${folder} - ${track.name}`)} 
                  >
                  <span>{getDisplayTrack(folder, track.name)}</span>
                  </div>
                  <span 
                  onClick={() => playTrack(track)}
                  className='play-button'>
                  &nbsp;►
                  </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={handleDisableAll}>Disable All</button>
          <button onClick={handleReset}>Set Default</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default MusicModal; 