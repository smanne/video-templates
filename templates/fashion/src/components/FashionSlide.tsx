import React, { useState } from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface FashionItem {
  title: string;
  subtitle?: string;
  category: string;
  image?: string;
  price?: string;
  description?: string;
  brand?: string;
  trendNumber?: number;
}

interface FashionSlideProps {
  item: FashionItem;
  backgroundMusic?: string;
  isLast?: boolean;
}

export const FashionSlide: React.FC<FashionSlideProps> = ({
  item,
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

  // Slow panning animation for background image
  const moveX = (frame / fps) * 2.5;
  const moveY = (frame / fps) * 1.5;
  const scale = 1.2 + (frame / fps) * 0.01;
  const rotate = (frame / fps) * 0.5;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
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
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {item.image && !imageError ? (
          <>
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '120%',
                height: '120%',
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
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)',
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

      {/* Trend Number */}
      <div
        style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          zIndex: 1,
          opacity: contentOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        {item.trendNumber && (
          <div
            style={{
              fontSize: '8em',
              fontWeight: '700',
              color: '#fff',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              opacity: 0.5,
              fontStyle: 'italic',
            }}
          >
            #{item.trendNumber}
          </div>
        )}
      </div>

      {/* Category Badge */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: contentOpacity,
          backgroundColor: 'rgba(255,255,255,0.1)',
          padding: '12px 30px',
          borderRadius: '30px',
          marginTop: '160px',
          fontSize: '2em',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        {item.category}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '1000px',
          padding: '0 30px',
          marginTop: '40px',
        }}
      >
        <h1
          style={{
            fontSize: '5em',
            margin: '0',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            transform: `scale(${titleScale})`,
            opacity: contentOpacity,
            textTransform: 'uppercase',
            lineHeight: '1.1',
          }}
        >
          {item.title}
        </h1>
        {item.subtitle && (
          <h2
            style={{
              fontSize: '2.5em',
              margin: '30px 0 0',
              color: '#fff',
              fontWeight: 300,
              letterSpacing: '0.02em',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              opacity: subtitleOpacity,
              fontStyle: 'italic',
            }}
          >
            {item.subtitle}
          </h2>
        )}
      </div>

      {/* Price */}
      {item.price && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '40px',
            zIndex: 1,
            opacity: contentOpacity,
            fontSize: '3em',
            fontWeight: '300',
            color: '#fff',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            transform: 'rotate(90deg)',
            transformOrigin: 'right center',
          }}
        >
          {item.price}
        </div>
      )}

      {/* Description */}
      {item.description && (
        <div
          style={{
            position: 'absolute',
            bottom: '160px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            opacity: descriptionOpacity,
            maxWidth: '1800px',
            width: '90%',
            padding: '40px 60px',
            fontSize: '2.8em',
            color: '#fff',
            fontWeight: 300,
            lineHeight: '1.4',
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            letterSpacing: '0.02em',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '30px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
            border: '2px solid rgba(255,255,255,0.1)',
          }}
        >
          {item.description}
        </div>
      )}
    </AbsoluteFill>
  );
}; 