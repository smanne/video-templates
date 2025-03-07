import React from 'react';
import { Audio } from 'remotion';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  startFrom?: number;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  volume = 1,
  startFrom = 0,
}) => {
  return (
    <Audio
      src={src}
      volume={volume}
      startFrom={startFrom}
    />
  );
}; 