import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface IntroSlideProps {
  title: string;
  subtitle: string;
}

export const IntroSlide: React.FC<IntroSlideProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const titleScale = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const subtitleOpacity = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const lineWidth = spring({
    frame: frame - 30,
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
        backgroundColor: '#1a1a1a',
        color: 'white',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px',
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.15) 0%, rgba(26,26,26,0.95) 70%)',
          zIndex: 0,
        }}
      />

      {/* Dark Overlay for Better Contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.7) 100%)',
          zIndex: 0,
        }}
      />

      {/* Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '35px',
          maxWidth: '90%',
        }}
      >
        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h1
            style={{
              fontSize: '6.5em',
              fontWeight: '900',
              margin: 0,
              color: '#ffffff',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              fontStretch: 'condensed',
            }}
          >
            {title.split(' ').map((word, i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  color: i === 0 ? '#FFD700' : '#ffffff',
                  textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        {/* Decorative Line */}
        <div
          style={{
            width: `${lineWidth * 120}px`,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
            borderRadius: '2px',
            margin: '10px 0',
            opacity: 0.8,
            boxShadow: '0 2px 10px rgba(255,215,0,0.3)',
          }}
        />

        {/* Subtitle */}
        <h2
          style={{
            fontSize: '3em',
            fontWeight: '500',
            margin: 0,
            opacity: subtitleOpacity,
            color: '#FFD700',
            maxWidth: '80%',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}
        >
          {subtitle}
        </h2>

        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '-120%',
            left: '-120%',
            right: '-120%',
            bottom: '-120%',
            background: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.08) 0%, rgba(26,26,26,0) 70%)',
            transform: `rotate(${frame / 2}deg)`,
            zIndex: -1,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}; 