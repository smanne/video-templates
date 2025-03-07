import React, { useState } from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface StockData {
  type: 'overview' | 'technical' | 'fundamental' | 'forecast' | 'recommendation';
  title: string;
  subtitle?: string;
  stockName: string;
  stockSymbol: string;
  currentPrice?: number;
  priceChange?: number;
  image?: string;
  metrics?: {
    label: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  bulletPoints?: string[];
  recommendation?: 'BUY' | 'SELL' | 'HOLD';
}

interface StockSlideProps {
  data: StockData;
  backgroundMusic?: string;
  isLast?: boolean;
}

export const StockSlide: React.FC<StockSlideProps> = ({
  data,
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

  const metricsOpacity = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Background animation
  const moveX = (frame / fps) * 2.5;
  const moveY = (frame / fps) * 1.5;
  const scale = 1.2 + (frame / fps) * 0.01;
  const rotate = (frame / fps) * 0.5;

  const getRecommendationColor = (rec?: string) => {
    switch (rec) {
      case 'BUY':
        return '#4CAF50';
      case 'SELL':
        return '#f44336';
      case 'HOLD':
        return '#FFC107';
      default:
        return '#ffffff';
    }
  };

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#0A1929',
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
          top: '-10%',
          left: '-10%',
          right: '-10%',
          bottom: '-10%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {data.image && !imageError ? (
          <>
            <img
              src={data.image}
              alt={data.title}
              style={{
                width: '120%',
                height: '120%',
                objectFit: 'cover',
                opacity: imageLoaded ? 0.3 : 0,
                transition: 'opacity 0.5s ease-in-out',
                transform: `scale(${scale}) translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`,
                transformOrigin: 'center center',
                filter: 'blur(5px)',
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
                background: 'linear-gradient(135deg, rgba(10,25,41,0.95) 0%, rgba(10,25,41,0.8) 100%)',
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
              background: 'linear-gradient(135deg, #0A1929 0%, #1A2B3D 100%)',
            }}
          />
        )}
      </div>

      {/* Header */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: '40px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          opacity: contentOpacity,
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
          marginTop: '100px',
        }}
      >
        <div style={{ maxWidth: '60%' }}>
          <div
            style={{
              fontSize: '2.4em',
              fontWeight: '500',
              color: '#90CAF9',
              marginBottom: '15px',
            }}
          >
            {data.stockName}
          </div>
          <div
            style={{
              fontSize: '3.2em',
              fontWeight: '700',
              letterSpacing: '0.05em',
            }}
          >
            {data.stockSymbol}
          </div>
        </div>
        {data.currentPrice && (
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '4.2em',
                fontWeight: '700',
                marginBottom: '15px',
              }}
            >
              ₹{data.currentPrice.toLocaleString()}
            </div>
            {data.priceChange && (
              <div
                style={{
                  fontSize: '2.4em',
                  color: data.priceChange >= 0 ? '#4CAF50' : '#f44336',
                  fontWeight: '500',
                }}
              >
                {data.priceChange >= 0 ? '▲' : '▼'} {Math.abs(data.priceChange)}%
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: '35px 40px',
          marginTop: '20px',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <h1
          style={{
            fontSize: '4.8em',
            margin: '0',
            color: '#fff',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            transform: `scale(${titleScale})`,
            opacity: contentOpacity,
            lineHeight: '1.1',
          }}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <h2
            style={{
              fontSize: '2.8em',
              margin: '15px 0 0',
              color: '#90CAF9',
              fontWeight: 400,
              letterSpacing: '0.02em',
              opacity: contentOpacity,
              lineHeight: '1.2',
            }}
          >
            {data.subtitle}
          </h2>
        )}
      </div>

      {/* Metrics Grid */}
      {data.metrics && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            padding: '35px 40px',
            marginTop: '20px',
            display: 'grid',
            gridTemplateColumns: data.metrics.length === 3 ? '1fr 1fr 1fr' : 'repeat(2, 1fr)',
            gap: '30px',
            opacity: metricsOpacity,
            backgroundColor: 'rgba(255,255,255,0.02)',
            minHeight: '450px',
          }}
        >
          {data.metrics.map((metric, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '40px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minHeight: '350px',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '2.4em',
                  color: '#90CAF9',
                  marginBottom: '25px',
                  lineHeight: '1.3',
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: '3.8em',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  flexWrap: 'wrap',
                  lineHeight: '1.2',
                }}
              >
                {metric.value}
                {metric.change && (
                  <span
                    style={{
                      fontSize: '0.6em',
                      color:
                        metric.trend === 'up'
                          ? '#4CAF50'
                          : metric.trend === 'down'
                          ? '#f44336'
                          : '#FFC107',
                      fontWeight: '500',
                    }}
                  >
                    {metric.trend === 'up' ? '▲' : metric.trend === 'down' ? '▼' : '•'} {metric.change}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bullet Points */}
      {data.bulletPoints && (
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            padding: '40px',
            opacity: metricsOpacity,
            backgroundColor: 'rgba(0,0,0,0.3)',
            marginTop: data.metrics ? 0 : '20px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            minHeight: data.metrics ? '350px' : '450px',
          }}
        >
          {data.bulletPoints.map((point, index) => (
            <div
              key={index}
              style={{
                fontSize: '2.4em',
                marginBottom: index === data.bulletPoints!.length - 1 ? 0 : '25px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '20px',
                lineHeight: '1.3',
              }}
            >
              <span style={{ color: '#90CAF9', marginTop: '0.2em' }}>•</span>
              <span style={{ flex: 1 }}>{point}</span>
            </div>
          ))}
        </div>
      )}

      {/* Recommendation */}
      {data.recommendation && (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            zIndex: 1,
            opacity: metricsOpacity,
            backgroundColor: getRecommendationColor(data.recommendation),
            padding: '20px 50px',
            borderRadius: '15px',
            fontSize: '3em',
            fontWeight: '700',
            color: '#000',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          }}
        >
          {data.recommendation}
        </div>
      )}
    </AbsoluteFill>
  );
}; 