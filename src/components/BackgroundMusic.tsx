import { Audio } from 'remotion';

interface BackgroundMusicProps {
  src: string;
  volume?: number;
  startFrom?: number;
  endAt?: number;
  playbackRate?: number;
  loop?: boolean;
}

export const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  src,
  volume = 1,
  startFrom = 0,
  endAt = 30,
  playbackRate = 1,
  loop = true,
}) => {
  return (
    <Audio
      src={src}
      volume={volume}
      startFrom={startFrom}
      endAt={endAt}
      playbackRate={playbackRate}
      loop={loop}
      crossOrigin="anonymous"
      muted={false}
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    />
  );
}; 