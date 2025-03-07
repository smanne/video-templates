import { AbsoluteFill } from 'remotion';
import { Audio, staticFile } from 'remotion';

export const AudioTest: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: 'white',
        fontSize: '2em',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      Audio Test Video
      <Audio
        src={staticFile("assets/background-music.mp3")}
        volume={1}
        startFrom={0}
        endAt={90}
        playbackRate={1}
        loop
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        crossOrigin="anonymous"
        muted={false}
      />
    </AbsoluteFill>
  );
}; 