import React from 'react';
import { Composition, registerRoot, staticFile } from 'remotion';
import { Video } from './components/Video';

const headlines = [
  {
    title: "Breaking: Major Tech Company Announces Revolutionary AI Breakthrough",
    subtitle: "New technology promises to transform industries worldwide",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&h=1920&fit=crop",
    description: "The groundbreaking development in artificial intelligence marks a significant leap forward in machine learning capabilities, with potential applications across healthcare, transportation, and scientific research."
  },
  {
    title: "Global Climate Summit Reaches Historic Agreement",
    subtitle: "World leaders commit to unprecedented environmental action",
    category: "Environment",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1080&h=1920&fit=crop",
    description: "In a landmark decision, participating nations have agreed to implement comprehensive measures to reduce carbon emissions and accelerate the transition to renewable energy sources."
  },
  {
    title: "SpaceX Successfully Launches New Satellite Constellation",
    subtitle: "Expanding global internet coverage reaches new milestone",
    category: "Space",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1080&h=1920&fit=crop",
    description: "The latest batch of satellites brings the total constellation to over 1,000 units, significantly improving global internet connectivity and reducing latency in remote areas."
  }
];

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Headlines"
        component={Video}
        durationInFrames={900} // 30 seconds total (3 headlines × 10 seconds each)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          headlines,
          backgroundMusic: staticFile("/news.mp3")
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot); 