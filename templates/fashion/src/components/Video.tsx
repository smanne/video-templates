import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { FashionSlide } from './FashionSlide';
import { BackgroundMusic } from './BackgroundMusic';

interface FashionItem {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;
  price?: string;
  description?: string;
  brand?: string;
}

interface VideoProps {
  items: FashionItem[];
  backgroundMusic?: string;
}

export const Video: React.FC<VideoProps> = ({ items, backgroundMusic }) => {
  const slideDuration = 300; // 10 seconds per slide
  const totalDuration = items.length * slideDuration;

  return (
    <AbsoluteFill>
      {backgroundMusic && (
        <BackgroundMusic src={backgroundMusic} volume={0.2} />
      )}
      
      {items.map((item, index) => (
        <Sequence
          key={index}
          from={index * slideDuration}
          durationInFrames={slideDuration}
        >
          <FashionSlide
            item={item}
            backgroundMusic={backgroundMusic}
            isLast={index === items.length - 1}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}; 