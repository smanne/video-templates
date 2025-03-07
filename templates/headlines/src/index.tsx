import React from 'react';
import { Composition } from 'remotion';
import { Video } from './components/Video';

const headlines = [
  {
    title: "Breaking: Major Tech Company Announces Revolutionary AI Breakthrough",
    subtitle: "New technology promises to transform industries worldwide",
    category: "Technology",
    timestamp: "2024-03-20 14:30",
    image: "https://source.unsplash.com/random/1920x1080?technology"
  },
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    subtitle: "World leaders commit to unprecedented environmental action",
    category: "Environment",
    timestamp: "2024-03-20 15:45",
    image: "https://source.unsplash.com/random/1920x1080?nature"
  },
  {
    title: "SpaceX Successfully Launches New Satellite Constellation",
    subtitle: "Expanding global internet coverage reaches new milestone",
    category: "Space",
    timestamp: "2024-03-20 16:15",
    image: "https://source.unsplash.com/random/1920x1080?space"
  }
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Headlines"
        component={Video}
        durationInFrames={900} // 30 seconds total (3 headlines × 10 seconds each)
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          headlines,
          backgroundMusic: "https://example.com/background-music.mp3"
        }}
      />
    </>
  );
}; 