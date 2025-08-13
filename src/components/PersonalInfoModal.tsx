import React from 'react';
import './PersonalInfoModal.css';
import banner from '/banner.png';
import { useTranslation } from 'react-i18next';

interface PersonalInfoModalProps {
  onClose: () => void;
}

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({ onClose }) => {

  const { t } = useTranslation();

  const email = "scarobey.buy@gmail.com";
  const telegram = "https://t.me/SANWSHTG";
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <h1>Credits</h1>
        <h3 className='credit-text'>Music by&nbsp; 
          <a href="https://www.youtube.com/@DMJ" target="_blank" rel="noopener noreferrer">Damjan Mravunac</a>
        </h3>
        <h3 className='credit-text'>All rights belong to&nbsp; 
          <a href="https://www.croteam.com/" target="_blank" rel="noopener noreferrer">Croteam</a>
        </h3>

        <div className="info-card">
        <div className="info-card-header">
          <h3 className='credit-header'>{ t('credits.thanks.index') }</h3>
        </div>
        <span style={{display: 'block'}}><b style={{color: 'pink',letterSpacing: '1px'}}>hobu40k</b>&nbsp;{ t('credits.thanks.hobu40k') }</span>
        <span style={{display: 'block'}}><b style={{color: 'dodgerblue',letterSpacing: '1px'}}>Riba4ok13</b>&nbsp;{ t('credits.thanks.riba4ok13') }</span>
        <span style={{display: 'block'}}><b style={{color: 'orange',letterSpacing: '1px'}}>LisSen</b>&nbsp;{ t('credits.thanks.lissen') }</span>
        <span style={{display: 'block'}}><b style={{color: 'gold',letterSpacing: '1px'}}>Thanadrax</b>&nbsp;{ t('credits.thanks.thanadrax') }</span>
        <span style={{display: 'block'}}><b style={{color: 'green',letterSpacing: '1px'}}>HChrel</b>&nbsp;{ t('credits.thanks.hchrel') }</span>
        </div>

        <div className="info-card">
        <div className="info-card-header">
          <h3 className='credit-header'>My contacts</h3>
        </div>
        <span style={{display: 'block'}}>Email: <a href={`mailto:${email}`}>{email}</a></span>
        <span style={{display: 'block'}}>Telegram: <a href={telegram}>{telegram}</a></span>
        <span style={{display: 'block'}}>Author: SANWHSH</span>
        </div>

        <img src={banner} alt="logo" className='banner' />
      </div>
    </div>
  );
};

export default PersonalInfoModal; 