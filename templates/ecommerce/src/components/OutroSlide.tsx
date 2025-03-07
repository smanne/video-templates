import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface OutroSlideProps {
  title: string;
  subtitle?: string;
  backgroundMusic?: string;
}

export const OutroSlide: React.FC<OutroSlideProps> = ({
  title,
  subtitle,
  backgroundMusic,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Calculate fadeout for the last 2 seconds
  const fadeoutStart = durationInFrames - 2 * fps;
  const fadeoutDuration = 2 * fps;
  const opacity = interpolate(
    frame,
    [fadeoutStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: '#fff',
        fontFamily: 'Georgia, serif',
      }}
    >
      {backgroundMusic && (
        <BackgroundMusic
          src={backgroundMusic}
          volume={opacity}
          startFrom={0}
        />
      )}
      <h1
        style={{
          fontSize: '72px',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '20px',
          opacity,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <h2
          style={{
            fontSize: '36px',
            textAlign: 'center',
            opacity,
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
            fontWeight: 300,
            letterSpacing: '0.02em',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </h2>
      )}
    </AbsoluteFill>
  );
}; 