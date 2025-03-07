import React from 'react';
import { Composition, registerRoot, staticFile } from 'remotion';
import { Video } from './components/Video';

const items = [
  {
    trendNumber: 1,
    title: "Sustainable Fashion",
    subtitle: "Eco-Conscious Style Movement",
    category: "2024 Trend",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=1080&h=1920&fit=crop",
    description: "Sustainable and eco-friendly fashion takes center stage with recycled materials, ethical production, and timeless designs."
  },
  {
    trendNumber: 2,
    title: "Digital Fashion",
    subtitle: "Virtual Wardrobes & NFTs",
    category: "Tech Trend",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1080&h=1920&fit=crop",
    description: "The rise of digital fashion and virtual try-ons revolutionizes how we experience and purchase clothing."
  },
  {
    trendNumber: 3,
    title: "Y2K Revival",
    subtitle: "Nostalgia Meets Modern",
    category: "Style Comeback",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1080&h=1920&fit=crop",
    description: "The return of Y2K fashion brings back bold colors, crop tops, and platform shoes with a contemporary twist."
  },
  {
    trendNumber: 4,
    title: "Gender-Fluid Fashion",
    subtitle: "Breaking Boundaries",
    category: "Cultural Shift",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1080&h=1920&fit=crop",
    description: "Gender-neutral designs and fluid fashion choices redefine traditional style boundaries."
  },
  {
    trendNumber: 5,
    title: "AI-Designed Fashion",
    subtitle: "The Future of Design",
    category: "Innovation",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&h=1920&fit=crop",
    description: "Artificial Intelligence revolutionizes fashion design, creating unique patterns and personalized styles."
  }
];

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Fashion"
        component={Video}
        durationInFrames={1500} // 30 seconds per slide × 5 slides
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          items,
          backgroundMusic: staticFile("/news.mp3")
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot); 