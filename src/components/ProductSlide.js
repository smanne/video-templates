const { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } = require('remotion');

const ProductSlide = ({ product }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = spring({
    frame,
    fps,
    config: {
      damping: 200,
      stiffness: 200,
      mass: 0.5,
    },
  });
  
  const detailsOpacity = spring({
    frame: frame - 15,
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '60%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
      
      <div
        style={{
          opacity: titleOpacity,
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <h1 style={{ fontSize: '2.5em', margin: '0' }}>{product.title}</h1>
        <p style={{ fontSize: '1.5em', margin: '10px 0' }}>
          Rating: {product.rating} | Price: ${product.price}
        </p>
      </div>
      
      <div
        style={{
          opacity: detailsOpacity,
          display: 'flex',
          gap: '40px',
          marginTop: '20px',
        }}
      >
        <div>
          <h3 style={{ color: '#4CAF50' }}>Pros</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {product.details.pros.map((pro, index) => (
              <li key={index} style={{ margin: '5px 0' }}>{pro}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{ color: '#f44336' }}>Cons</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {product.details.cons.map((con, index) => (
              <li key={index} style={{ margin: '5px 0' }}>{con}</li>
            ))}
          </ul>
        </div>
      </div>
    </AbsoluteFill>
  );
};

module.exports = { ProductSlide }; 