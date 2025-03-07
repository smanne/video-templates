const { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } = require('remotion');
const { ProductSlide } = require('./ProductSlide');

const products = require('../../products.json');

const RemotionRoot = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {products.map((product, index) => {
        const startFrame = index * (durationInFrames / products.length);
        const endFrame = (index + 1) * (durationInFrames / products.length);
        
        return (
          <Sequence
            key={product.title}
            from={startFrame}
            durationInFrames={endFrame - startFrame}
          >
            <ProductSlide product={product} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

module.exports = { RemotionRoot }; 