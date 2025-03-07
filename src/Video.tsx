import { Composition } from 'remotion';
import { RemotionRoot } from './components/RemotionRoot';

export const RemotionVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="AmazonProductVideo"
        component={RemotionRoot}
        durationInFrames={300} // 10 seconds per product for 3 products
        fps={30}
        width={1080}
        height={1350} // 4:5 aspect ratio for Instagram
        defaultProps={{
          products: []
        }}
      />
    </>
  );
}; 