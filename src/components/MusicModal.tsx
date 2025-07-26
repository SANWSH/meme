import React from 'react';
import './MusicModal.css';
import { musicTracks } from '../music';
import { getDisplayFolder, getDisplayTrack, getDisplayName } from '../config/nameConfig';

interface MusicModalProps {
  onSelectTrack: (track: { src: string; name: string }) => void;
  onClose: () => void;
}

const MusicModal: React.FC<MusicModalProps> = ({ onSelectTrack, onClose }) => {
  const groupedTracks: { [key: string]: { src: string; name: string }[] } = {};

  musicTracks.forEach(track => {
    const [folder, trackName] = track.name.split(' - ');
    if (!groupedTracks[folder]) {
      groupedTracks[folder] = [];
    }
    groupedTracks[folder].push({ ...track, name: trackName });
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Select a Track</h2>
        <div className="track-list">
          {Object.keys(groupedTracks).map(folder => (
            <div key={folder} className="track-group">
              <h3>{getDisplayFolder(folder)}</h3>
              <ul>
                {groupedTracks[folder].map(track => (
                  <li key={track.name}>
                    <button onClick={() => onSelectTrack({ ...track, name: getDisplayName(`${folder} - ${track.name}`) })}>
                      {getDisplayTrack(folder, track.name)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicModal; 