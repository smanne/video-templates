import React, { useState } from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface Headline {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;
  description?: string;
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
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

  const descriptionOpacity = spring({
    frame: frame - 60,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Background image animation
  const moveX = (frame / fps) * 2.5;
  const moveY = (frame / fps) * 1.5;
  const scale = 1.2 + (frame / fps) * 0.01; // Increased base scale to 1.2
  const rotate = (frame / fps) * 0.5;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
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

      {/* Background Image Container */}
      <div
        style={{
          position: 'absolute',
          top: '-10%', // Extend beyond container
          left: '-10%', // Extend beyond container
          right: '-10%', // Extend beyond container
          bottom: '-10%', // Extend beyond container
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {headline.image && !imageError ? (
          <>
            <img
              src={headline.image}
              alt={headline.title}
              style={{
                width: '120%', // Larger than container
                height: '120%', // Larger than container
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
                transform: `scale(${scale}) translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`,
                transformOrigin: 'center center',
              }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.9) 100%)',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out',
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
          marginTop: '80px',
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
          maxWidth: '800px',
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

      {/* Description */}
      {headline.description && (
        <div
          style={{
            position: 'absolute',
            bottom: '160px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            opacity: descriptionOpacity,
            maxWidth: '1600px',
            width: '90%',
            padding: '30px 80px',
            fontSize: '2.2em',
            color: '#fff',
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontWeight: 400,
            lineHeight: '1.4',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {headline.description}
        </div>
      )}
    </AbsoluteFill>
  );
}; 