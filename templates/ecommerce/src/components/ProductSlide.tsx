import React from 'react';
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { BackgroundMusic } from './BackgroundMusic';

interface Product {
  title: string;
  price: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  pros: string[];
  cons: string[];
}

interface ProductSlideProps {
  product: Product;
  backgroundMusic?: string;
}

export const ProductSlide: React.FC<ProductSlideProps> = ({ product, backgroundMusic }) => {
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

  // Show pros first, then fade out and show cons
  const prosOpacity = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const prosFadeOut = spring({
    frame: frame - 150, // Start fading out pros at 2 seconds (was 2.5)
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const consOpacity = spring({
    frame: frame - 155, // Start showing cons after pros fade out (was 3 seconds)
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Description animation
  const descriptionOpacity = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Calculate how many characters to show based on frame
  const charsPerFrame = 3; // Increased speed
  const visibleChars = Math.min(
    Math.floor((frame - 15) * charsPerFrame), // Start earlier
    product.description.length
  );
  const visibleDescription = product.description.slice(0, visibleChars);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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

      {/* Full-screen background image */}
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
        <img
          src={product.image}
          alt={product.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Dark gradient overlay */}
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
      </div>

      {/* Top Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          opacity: contentOpacity,
          maxWidth: '900px',
          width: '100%',
          padding: '30px',
          marginTop: '30px',
        }}
      >
        <h2
          style={{
            fontSize: '2.5em',
            margin: '0',
            textAlign: 'center',
            fontWeight: '700',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
          }}
        >
          {product.title}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontSize: '1.8em',
            fontWeight: '600',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{color: '#00ff00'}}>{product.price}</span>
          <span style={{color: '#ffd700'}}>
            {'★'.repeat(Math.floor(product.rating))}
            {product.rating % 1 !== 0 && '½'}
            {'☆'.repeat(5 - Math.ceil(product.rating))}
          </span>
          <span style={{color: '#888'}}>({product.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Description */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: descriptionOpacity,
          maxWidth: '900px',
          width: '100%',
          padding: '20px 40px',
          margin: '15px auto',
          background: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p
          style={{
            fontSize: '1.6em',
            lineHeight: 1.4,
            margin: 0,
            textAlign: 'center',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontStyle: 'italic',
          }}
        >
          {visibleDescription}
          {visibleChars < product.description.length && (
            <span style={{opacity: 0.5}}>|</span>
          )}
        </p>
      </div>

      {/* Bottom Content - Pros and Cons */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          opacity: contentOpacity,
          maxWidth: '900px',
          width: '100%',
          padding: '30px',
          margin: '0 auto',
        }}
      >
        {/* Pros */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            right: '30px',
            opacity: prosOpacity * (1 - prosFadeOut),
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '15px',
            padding: '30px',
            border: '1px solid rgba(0, 255, 0, 0.3)',
            boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)',
          }}
        >
          <h3
            style={{
              fontSize: '1.8em',
              margin: '0 0 20px 0',
              color: '#00ff00',
              fontWeight: '600',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Pros
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {product.pros.map((pro, index) => (
              <div
                key={index}
                style={{
                  fontSize: '1.4em',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{color: '#00ff00', fontSize: '1.2em'}}>✓</span>
                {pro}
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            right: '30px',
            opacity: consOpacity,
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '15px',
            padding: '30px',
            border: '1px solid rgba(255, 68, 68, 0.3)',
            boxShadow: '0 0 20px rgba(255, 68, 68, 0.1)',
          }}
        >
          <h3
            style={{
              fontSize: '1.8em',
              margin: '0 0 20px 0',
              color: '#ff4444',
              fontWeight: '600',
              textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            Cons
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
            }}
          >
            {product.cons.map((con, index) => (
              <div
                key={index}
                style={{
                  fontSize: '1.4em',
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{color: '#ff4444', fontSize: '1.2em'}}>✗</span>
                {con}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}; 