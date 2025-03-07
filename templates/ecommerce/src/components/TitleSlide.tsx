import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface TitleSlideProps {
  title: string;
  subtitle: string;
  backgroundImages: string[];
  backgroundMusic?: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  title,
  subtitle,
  backgroundImages,
  backgroundMusic,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = 150; // 5 seconds at 30fps
  
  // Create a smooth panning effect
  const panX = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  // Calculate the transform for the background images
  const transformValue = interpolate(
    panX,
    [0, 1],
    [0, -50]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Georgia, serif',
      }}
    >
      {backgroundMusic && (
        <BackgroundMusic
          src={backgroundMusic}
          volume={0.3}
          startFrom={0}
        />
      )}

      {/* Background Images Container */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          transform: `translateX(${transformValue}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            style={{
              flex: '0 0 100%',
              height: '100%',
              position: 'relative',
            }}
          >
            <img
              src={image}
              alt={`Background ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7)',
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 30px',
        }}
      >
        <h1
          style={{
            fontSize: '4.5em',
            margin: 0,
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            opacity: spring({
              frame,
              fps,
              config: {
                damping: 200,
                stiffness: 100,
                mass: 0.5,
              },
            }),
          }}
        >
          {title}
        </h1>
        <h2
          style={{
            fontSize: '2em',
            margin: '20px 0 0',
            color: '#fff',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.02em',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            opacity: spring({
              frame: frame - 10,
              fps,
              config: {
                damping: 200,
                stiffness: 100,
                mass: 0.5,
              },
            }),
          }}
        >
          {subtitle}
        </h2>
      </div>
    </AbsoluteFill>
  );
}; 