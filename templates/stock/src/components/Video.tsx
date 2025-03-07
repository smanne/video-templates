import React from 'react';
import { Sequence } from 'remotion';
import { StockSlide } from './StockSlide';

interface VideoProps {
  slides: any[];
  backgroundMusic?: string;
}

export const Video: React.FC<VideoProps> = ({ slides, backgroundMusic }) => {
  const SLIDE_DURATION = 300; // 10 seconds per slide at 30fps

  return (
    <>
      {slides.map((slide, index) => (
        <Sequence
          key={index}
          from={index * SLIDE_DURATION}
          durationInFrames={SLIDE_DURATION}
        >
          <StockSlide
            data={slide}
            backgroundMusic={backgroundMusic}
            isLast={index === slides.length - 1}
          />
        </Sequence>
      ))}
    </>
  );
}; 