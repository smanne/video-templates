import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { TitleSlide } from './TitleSlide';
import { ProductSlide } from './ProductSlide';
import { OutroSlide } from './OutroSlide';

interface RemotionRootProps {
  config: {
    titleSlide: {
      title: string;
      subtitle: string;
      backgroundImages: string[];
    };
    products: {
      title: string;
      price: string;
      rating: number;
      reviewCount: number;
      image: string;
      description: string;
      pros: string[];
      cons: string[];
    }[];
    audio: {
      backgroundMusic: string;
      volume: number;
    };
  };
}

export const RemotionRoot: React.FC<RemotionRootProps> = ({ config }) => {
  const { titleSlide, products, audio } = config;
  const titleDuration = 150;
  const productDuration = 300;
  const outroDuration = 150;

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={titleDuration}>
        <TitleSlide 
          title={titleSlide.title} 
          subtitle={titleSlide.subtitle}
          backgroundImages={titleSlide.backgroundImages}
          backgroundMusic={audio.backgroundMusic}
        />
      </Sequence>

      {products.map((product, index) => (
        <Sequence
          key={product.title}
          from={titleDuration + index * productDuration}
          durationInFrames={productDuration}
        >
          <ProductSlide 
            product={product} 
            backgroundMusic={audio.backgroundMusic}
          />
        </Sequence>
      ))}

      <Sequence
        from={titleDuration + (products.length * productDuration)}
        durationInFrames={outroDuration}
      >
        <OutroSlide 
          title="Thanks for Watching!"
          subtitle="Follow us for more amazing products"
          backgroundMusic={audio.backgroundMusic}
        />
      </Sequence>
    </AbsoluteFill>
  );
}; 