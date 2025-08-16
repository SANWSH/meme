import React, { type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next';

interface ControlsProps {
  'handle-PlayRandom': () => void;
  'handle-Download': () => void;
  'handle-SetVolume': Dispatch<SetStateAction<number>>;
  'handle-modal': Dispatch<SetStateAction<boolean>>;
  'handle-displayed': Dispatch<SetStateAction<string>>;
  Volume: number;
  isPlaying: boolean;
}

import PlaylistIcon from '../assets/Playlist.svg';
import DownloadIcon from '../assets/Download.svg';
import DiceIcon from '../assets/dice.svg';
import SoundIcon from '../assets/sound.svg';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

export default function Controls(props: ControlsProps) {

  const { t } = useTranslation();
  const {currentTrack} = useAudioPlayer();
  const { show, content, hide } = useModal();

  return (
    <div className="bottom-controls">
        <div className="left-controls">
          <div className="button-container">
            <button onClick={() => props['handle-modal'](true)} className="icon-button">
              <img src={PlaylistIcon} alt="Playlist" />
            </button>
            <div className="action-buttons">
              <button onClick={props['handle-Download']} className="icon-button" disabled={!props.isPlaying}>
                <img src={DownloadIcon} alt="Download" />
              </button>
              <button onClick={props['handle-PlayRandom']} className="icon-button" disabled={!props.isPlaying}>
                <img src={DiceIcon} alt="Next Random" />
              </button>
            </div>
          </div>
          <div className="track-info-container">
            {props.isPlaying ? (
              <div className="track-name" data-before={ t('controls.playstate') }>{props['handle-displayed'](currentTrack?.name || '')}</div>
            ) : (
              <h1>{ t("controls.pushplay") }</h1>
            )}
          </div>
        </div>
        <div className="volume-controls">
          <img src={SoundIcon} alt='' />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={props.Volume}
            onChange={(e) => props['handle-SetVolume'](parseFloat(e.target.value))}
            className="volume-slider vertical"
          />
        </div>
      </div>
  )
}
