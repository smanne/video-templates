import React from 'react';
import { Composition, registerRoot, staticFile } from 'remotion';
import { Video } from './components/Video';

// Sample data
const sampleDestinations = [
  {
    name: 'Taj Mahal',
    location: 'Agra, India',
    description: 'An ivory-white marble mausoleum on the right bank of the river Yamuna, commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    rating: 4.8,
    bestTimeToVisit: 'October to March',
    highlights: [
      'UNESCO World Heritage Site',
      'One of the New Seven Wonders of the World',
      'Stunning Mughal architecture',
      'Beautiful gardens and fountains'
    ],
    travelTips: [
      'Visit early morning to avoid crowds',
      'Closed on Fridays',
      'Hire a local guide for historical insights',
      'Photography allowed outside only'
    ],
    voiceOver: staticFile('/voiceovers/taj-mahal.mp3')
  },
  {
    name: 'Hawa Mahal',
    location: 'Jaipur, India',
    description: 'A palace in Jaipur, India, built from red and pink sandstone, known for its honeycomb-like structure of 953 small windows decorated with intricate latticework.',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    rating: 4.5,
    bestTimeToVisit: 'November to February',
    highlights: [
      'Unique architectural design',
      'Beautiful pink sandstone facade',
      'Rich cultural heritage',
      'Stunning city views'
    ],
    travelTips: [
      'Best views in morning light',
      'Visit the nearby markets',
      'Combine with City Palace tour',
      'Wear comfortable shoes'
    ],
    voiceOver: staticFile('/voiceovers/hawa-mahal.mp3')
  },
  {
    name: 'Amber Fort',
    location: 'Jaipur, India',
    description: 'A majestic fort-palace complex built from pale yellow and pink sandstone and white marble, featuring stunning artistic elements of both Hindu and Muslim styles.',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1600&q=80',
    rating: 4.7,
    bestTimeToVisit: 'October to March',
    highlights: [
      'Stunning hilltop location',
      'Sheesh Mahal (Mirror Palace)',
      'Elephant rides available',
      'Sound and light show'
    ],
    travelTips: [
      'Start early to avoid heat',
      'Book guided tours in advance',
      'Carry water and sunscreen',
      'Allow 2-3 hours for visit'
    ]
  }
];

const Root: React.FC = () => {
  const INTRO_DURATION = 120; // 4 seconds
  const SLIDE_DURATION = 300; // 10 seconds per slide
  const TOTAL_DURATION = INTRO_DURATION + (SLIDE_DURATION * sampleDestinations.length);

  return (
    <>
      <Composition
        id="Travel"
        component={Video}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          destinations: sampleDestinations,
          title: "Top Destinations in India",
          subtitle: "Exploring the Golden Triangle",
          backgroundMusic: staticFile("/travel.mp3")
        }}
      />
    </>
  );
};

registerRoot(Root); 