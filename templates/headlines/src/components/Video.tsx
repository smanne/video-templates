import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { HeadlineSlide } from './HeadlineSlide';
import { BackgroundMusic } from './BackgroundMusic';

interface Headline {
  title: string;
  subtitle?: string;
  category: string;
  timestamp: string;
  image?: string;
}

interface VideoProps {
  headlines: Headline[];
  backgroundMusic?: string;
}

export const Video: React.FC<VideoProps> = ({ headlines, backgroundMusic }) => {
  const slideDuration = 300; // 10 seconds per slide
  const totalDuration = headlines.length * slideDuration;

  return (
    <AbsoluteFill>
      {backgroundMusic && (
        <BackgroundMusic src={backgroundMusic} volume={0.2} />
      )}
      
      {headlines.map((headline, index) => (
        <Sequence
          key={index}
          from={index * slideDuration}
          durationInFrames={slideDuration}
        >
          <HeadlineSlide
            headline={headline}
            isLast={index === headlines.length - 1}
            backgroundMusic={backgroundMusic}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}; 