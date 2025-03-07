import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface Headline {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;
  timestamp: string;
}

interface HeadlineSlideProps {
  headline: Headline;
  backgroundMusic?: string;
  isLast?: boolean;
}

export const HeadlineSlide: React.FC<HeadlineSlideProps> = ({
  headline,
  backgroundMusic,
  isLast = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideOpacity = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const contentOpacity = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const titleScale = spring({
    frame: frame - 30,
    fps,
    config: {
      damping: 200,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const subtitleOpacity = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontFamily: 'Georgia, serif',
        overflow: 'hidden',
        opacity: slideOpacity,
      }}
    >
      {backgroundMusic && (
        <BackgroundMusic
          src={backgroundMusic}
          volume={0.3}
          startFrom={0}
        />
      )}

      {/* Background Image or Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      >
        {headline.image ? (
          <>
            <img
              src={headline.image}
              alt={headline.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)',
              }}
            />
          </>
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            }}
          />
        )}
      </div>

      {/* Category Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: contentOpacity,
          backgroundColor: '#ff4444',
          padding: '8px 16px',
          borderRadius: '20px',
          marginTop: '40px',
          fontSize: '1.2em',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}
      >
        {headline.category}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 30px',
          marginTop: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '3.5em',
            margin: '0',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            transform: `scale(${titleScale})`,
            opacity: contentOpacity,
          }}
        >
          {headline.title}
        </h1>
        {headline.subtitle && (
          <h2
            style={{
              fontSize: '1.8em',
              margin: '20px 0 0',
              color: '#fff',
              fontFamily: 'Helvetica Neue, Arial, sans-serif',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              opacity: subtitleOpacity,
            }}
          >
            {headline.subtitle}
          </h2>
        )}
      </div>

      {/* Timestamp */}
      <div
        style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          zIndex: 1,
          opacity: contentOpacity,
          fontSize: '1.2em',
          color: '#888',
          fontFamily: 'Helvetica Neue, Arial, sans-serif',
        }}
      >
        {headline.timestamp}
      </div>

      {/* Breaking News Banner */}
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
            opacity: spring({
              frame: frame - 60,
              fps,
              config: {
                damping: 200,
                stiffness: 200,
                mass: 0.5,
              },
            }),
            backgroundColor: '#ff4444',
            color: '#fff',
            padding: '10px',
            textAlign: 'center',
            fontSize: '1.4em',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          Breaking News
        </div>
      )}
    </AbsoluteFill>
  );
}; 