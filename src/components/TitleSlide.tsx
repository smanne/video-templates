import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

interface TitleSlideProps {
  title: string;
  subtitle: string;
  backgroundImages: string[];
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  title,
  subtitle,
  backgroundImages,
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
      }}
    >
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
          maxWidth: '1000px',
          padding: '0 40px',
        }}
      >
        <h1
          style={{
            fontSize: '5em',
            margin: 0,
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
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
            fontSize: '2.5em',
            margin: '20px 0 0',
            color: '#fff',
            fontWeight: 300,
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