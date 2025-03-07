import { Composition, Sequence } from 'remotion';
import { TitleSlide } from './components/TitleSlide';
import { ProductSlide } from './components/ProductSlide';
import { BackgroundMusic } from './components/BackgroundMusic';

interface Config {
  titleSlide: {
    title: string;
    subtitle: string;
    backgroundImages: string[];
  };
  products: Array<{
    title: string;
    price: string;
    rating: number;
    reviewCount: number;
    image: string;
    description: string;
    pros: string[];
    cons: string[];
  }>;
  audio: {
    backgroundMusic: string;
    volume: number;
    startFrom: number;
    endAt: number;
    playbackRate: number;
    loop: boolean;
  };
}

interface RemotionRootProps {
  config: Config;
}

export const RemotionRoot: React.FC<RemotionRootProps> = ({ config }) => {
  return (
    <>
      <Composition
        id="AmazonProductVideo"
        component={AmazonProductVideo}
        durationInFrames={150 + (config.products.length * 150)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          products: config.products,
          titleSlide: config.titleSlide,
          audio: config.audio,
        }}
      />
      <Composition
        id="AudioTest"
        component={AudioTest}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          audio: config.audio,
        }}
      />
    </>
  );
};

interface AmazonProductVideoProps {
  products: Config['products'];
  titleSlide: Config['titleSlide'];
  audio: Config['audio'];
}

const AmazonProductVideo: React.FC<AmazonProductVideoProps> = ({
  products,
  titleSlide,
  audio,
}) => {
  return (
    <>
      <BackgroundMusic
        src={audio.backgroundMusic}
        volume={audio.volume}
        startFrom={audio.startFrom}
        endAt={audio.endAt}
        playbackRate={audio.playbackRate}
        loop={audio.loop}
      />
      <Sequence from={0} durationInFrames={150}>
        <TitleSlide {...titleSlide} />
      </Sequence>
      {products.map((product, index) => (
        <Sequence 
          key={index}
          from={150 + (index * 150)} 
          durationInFrames={150}
        >
          <ProductSlide product={product} />
        </Sequence>
      ))}
    </>
  );
};

interface AudioTestProps {
  audio: Config['audio'];
}

const AudioTest: React.FC<AudioTestProps> = ({ audio }) => {
  return (
    <div>
      {/* Implementation of AudioTest component */}
    </div>
  );
}; 