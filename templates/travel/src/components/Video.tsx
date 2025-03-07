import React from 'react';
import { Sequence, Series } from 'remotion';
import { DestinationSlide } from './DestinationSlide';
import { IntroSlide } from './IntroSlide';
import { BackgroundMusic } from './BackgroundMusic';

interface VideoProps {
  destinations: {
    name: string;
    location: string;
    description: string;
    image: string;
    rating?: number;
    bestTimeToVisit?: string;
    highlights?: string[];
    travelTips?: string[];
  }[];
  title: string;
  subtitle?: string;
  backgroundMusic?: string;
}

export const Video: React.FC<VideoProps> = ({
  destinations,
  title,
  subtitle = "",
  backgroundMusic,
}) => {
  const INTRO_DURATION = 120; // 4 seconds at 30fps
  const SLIDE_DURATION = 300; // 10 seconds at 30fps

  return (
    <>
      {backgroundMusic && (
        <BackgroundMusic
          src={backgroundMusic}
          volume={0.3}
          startFrom={0}
        />
      )}
      <Series>
        <Series.Sequence durationInFrames={INTRO_DURATION}>
          <IntroSlide title={title} subtitle={subtitle} />
        </Series.Sequence>
        {destinations.map((destination, index) => (
          <Series.Sequence durationInFrames={SLIDE_DURATION} key={index}>
            <DestinationSlide
              data={destination}
              rank={index + 1}
              isLast={index === destinations.length - 1}
            />
          </Series.Sequence>
        ))}
      </Series>
    </>
  );
}; 