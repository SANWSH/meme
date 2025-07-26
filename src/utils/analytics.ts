interface DatalayerWindow extends Window {
  dataLayer: any[];
}

declare const window: DatalayerWindow;

export const trackSongPlay = (trackName: string) => {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'song_play',
      track_name: trackName,
    });
  }
}; 