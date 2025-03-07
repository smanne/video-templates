import React, { useState } from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { VoiceOver } from './VoiceOver';

interface DestinationData {
  name: string;
  location: string;
  description: string;
  image: string;
  rating?: number;
  bestTimeToVisit?: string;
  highlights?: string[];
  travelTips?: string[];
  voiceOver?: string;
}

interface DestinationSlideProps {
  data: DestinationData;
  rank: number;
  isLast?: boolean;
}

export const DestinationSlide: React.FC<DestinationSlideProps> = ({
  data,
  rank,
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

  const detailsOpacity = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Background animation
  const moveX = (frame / fps) * 2;
  const moveY = (frame / fps) * 1.5;
  const scale = 1.1 + (frame / fps) * 0.01;
  const rotate = (frame / fps) * 0.3;

  const highlightsOpacity = spring({
    frame: frame - 60,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const tipsOpacity = spring({
    frame: frame - 90,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const numberOpacity = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const numberScale = spring({
    frame: frame - 20,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const numberSlide = spring({
    frame: frame - 20,
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
        overflow: 'hidden',
        opacity: slideOpacity,
      }}
    >
      {data.voiceOver && (
        <VoiceOver
          src={data.voiceOver}
          volume={0.8}
          startFrom={0}
        />
      )}
      {/* Background Image Container */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          right: '-15%',
          bottom: '-15%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {data.image && !imageError ? (
          <>
            <img
              src={data.image}
              alt={data.name}
              style={{
                width: '130%',
                height: '130%',
                objectFit: 'cover',
                opacity: imageLoaded ? 0.85 : 0,
                transition: 'opacity 0.5s ease-in-out',
                transform: `scale(${scale * 1.1}) translate(${moveX * 1.2}px, ${moveY * 1.2}px) rotate(${rotate * 0.8}deg)`,
                transformOrigin: 'center center',
                filter: 'blur(2px) brightness(1.1)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4)',
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
                background: 'linear-gradient(180deg, rgba(26,26,26,0.98) 0%, rgba(26,26,26,0.7) 35%, rgba(26,26,26,0.5) 50%, rgba(26,26,26,0.7) 65%, rgba(26,26,26,0.98) 100%)',
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
              background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            }}
          />
        )}
      </div>

      {/* Content Container - Adding a subtle gradient overlay for better text readability */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, rgba(26,26,26,0.4) 0%, rgba(26,26,26,0) 100%)',
          zIndex: 1,
        }}
      />

      {/* Rank Number - With animations */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '40px',
          fontSize: '7em',
          fontWeight: '800',
          opacity: numberOpacity * 0.15,
          color: '#FFD700',
          zIndex: 2,
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          transform: `scale(${numberScale}) translateX(${(1 - numberSlide) * 50}px)`,
          transformOrigin: 'right center',
        }}
      >
        <span 
          style={{ 
            fontSize: '0.5em', 
            opacity: 0.8,
            transform: `translateX(${(1 - numberSlide) * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          #
        </span>
        <span
          style={{
            transform: `translateX(${(1 - numberSlide) * 30}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          {rank}
        </span>
      </div>

      {/* Main Content - Adjusted padding */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: '40px 60px',
          paddingTop: '180px',
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: contentOpacity,
            transform: `scale(${titleScale})`,
            transformOrigin: 'left center',
          }}
        >
          <h1
            style={{
              fontSize: '4.2em',
              margin: '0',
              fontWeight: '700',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              lineHeight: '1.1',
            }}
          >
            {data.name}
          </h1>
          <h2
            style={{
              fontSize: '2.2em',
              margin: '12px 0 0',
              fontWeight: '500',
              color: '#FFD700',
              opacity: 0.9,
            }}
          >
            {data.location}
          </h2>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '1.8em',
            marginTop: '25px',
            lineHeight: '1.4',
            opacity: detailsOpacity,
            maxWidth: '95%',
          }}
        >
          {data.description}
        </div>

        {/* Additional Info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            opacity: detailsOpacity,
            marginTop: '30px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '20px 25px',
          }}
        >
          {data.bestTimeToVisit && (
            <div
              style={{
                fontSize: '1.8em',
                color: '#FFD700',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ opacity: 0.8 }}>Best Time:</span>
              <span style={{ fontWeight: '500' }}>{data.bestTimeToVisit}</span>
            </div>
          )}
          {data.rating && (
            <div
              style={{
                fontSize: '2em',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ color: '#FFD700' }}>★</span>
              <span style={{ fontWeight: '600' }}>{data.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom Info Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          {/* Highlights */}
          {data.highlights && (
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '25px',
                backdropFilter: 'blur(10px)',
                opacity: highlightsOpacity,
                transform: `translateY(${(1 - highlightsOpacity) * 20}px)`,
              }}
            >
              <h3
                style={{
                  fontSize: '2em',
                  margin: '0 0 15px',
                  color: '#FFD700',
                }}
              >
                Highlights
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px 20px',
                }}
              >
                {data.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: '1.6em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span style={{ color: '#FFD700' }}>•</span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel Tips */}
          {data.travelTips && (
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '25px',
                backdropFilter: 'blur(10px)',
                opacity: tipsOpacity,
                transform: `translateY(${(1 - tipsOpacity) * 20}px)`,
              }}
            >
              <h3
                style={{
                  fontSize: '2em',
                  margin: '0 0 15px',
                  color: '#FFD700',
                }}
              >
                Travel Tips
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '12px 20px',
                }}
              >
                {data.travelTips.map((tip, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: '1.6em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span style={{ color: '#FFD700' }}>•</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}; 