import { AbsoluteFill, Sequence } from 'remotion';
import { TitleSlide } from './components/TitleSlide';
import { ProductSlide } from './components/ProductSlide';
import { BackgroundMusic } from './components/BackgroundMusic';

interface Product {
  title: string;
  price: string;
  rating: string;
  reviewCount: string;
  image: string;
  imageUrl: string;
  details: {
    pros: string[];
    cons: string[];
  };
}

interface AmazonProductVideoProps {
  products: {
    title: string;
    price: string;
    rating: number;
    reviewCount: number;
    image: string;
    pros: string[];
    cons: string[];
  }[];
}

export const AmazonProductVideo: React.FC<AmazonProductVideoProps> = ({ products }) => {
  return (
    <AbsoluteFill>
      <BackgroundMusic src="/path/to/background-music.mp3" />
      <Sequence from={0} durationInFrames={90}>
        <TitleSlide 
          title="Top Amazon Products"
          subtitle="Our Curated Selection"
          backgroundImages={[]} 
        />
      </Sequence>
      {products.map((product, index) => (
        <Sequence key={product.title} from={90 + index * 70} durationInFrames={70}>
          <ProductSlide product={{
            title: product.title,
            price: product.price,
            rating: product.rating,
            reviewCount: product.reviewCount,
            description: '', // Added missing required property
            image: product.image,
            pros: product.pros,
            cons: product.cons
          }} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}; 