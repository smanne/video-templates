import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { TitleSlide } from './TitleSlide';
import { ProductSlide } from './ProductSlide';

const products = require('../mockData');

export const RemotionRoot: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Calculate frames for title and product slides
  const titleDuration = 90; // 3 seconds at 30fps
  const productDuration = (durationInFrames - titleDuration) / products.length;
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Title Slide */}
      <Sequence
        from={0}
        durationInFrames={titleDuration}
      >
        <TitleSlide 
          title="Welcome to Our Products"
          subtitle="Check out our amazing collection"
          backgroundImages={[]}
        />
      </Sequence>
      
      {/* Product Slides */}
      {products.map((product: any, index: number) => {
        const startFrame = titleDuration + (index * productDuration);
        const endFrame = startFrame + productDuration;
        
        return (
          <Sequence
            key={product.title}
            from={startFrame}
            durationInFrames={productDuration}
          >
            <ProductSlide product={product} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}; 