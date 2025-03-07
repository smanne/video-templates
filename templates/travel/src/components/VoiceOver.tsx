import React from 'react';
import { Audio } from 'remotion';

interface VoiceOverProps {
  src: string;
  volume?: number;
  startFrom?: number;
}

export const VoiceOver: React.FC<VoiceOverProps> = ({
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