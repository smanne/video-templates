import { loadFont } from '@remotion/google-fonts/PlayfairDisplay';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';

export const loadFonts = async () => {
  await Promise.all([
    loadFont('700'),
    loadFont('400'),
    loadInter('300'),
  ]);
}; 