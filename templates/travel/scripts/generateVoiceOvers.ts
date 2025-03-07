import textToSpeech from '@google-cloud/text-to-speech';
import { writeFileSync } from 'fs';
import { join } from 'path';
import util from 'util';

// Sample destinations data
const destinations = [
  {
    name: 'Taj Mahal',
    script: `Welcome to the magnificent Taj Mahal in Agra, India. This stunning ivory-white marble mausoleum stands gracefully on the banks of the Yamuna River. Built in 1632 by Emperor Shah Jahan as a testament of love for his favorite wife, the Taj Mahal is a UNESCO World Heritage Site and one of the New Seven Wonders of the World. Its stunning Mughal architecture, beautiful gardens, and intricate details make it a must-visit destination. For the best experience, visit early morning to avoid crowds, and remember it's closed on Fridays.`
  },
  {
    name: 'Hawa Mahal',
    script: `Discover the enchanting Hawa Mahal in Jaipur, India. This remarkable palace, built from pink sandstone, is famous for its unique honeycomb-like structure featuring 953 small windows with intricate latticework. The palace showcases beautiful architecture, rich cultural heritage, and offers stunning views of the city. Visit during the morning light for the best views, and don't forget to explore the nearby markets. Combining your visit with the City Palace tour will give you a complete royal experience of Jaipur.`
  },
  {
    name: 'Amber Fort',
    script: `Experience the grandeur of Amber Fort, a majestic fort-palace complex in Jaipur. Built from pale yellow and pink sandstone and white marble, this architectural marvel beautifully blends Hindu and Muslim styles. The fort's stunning hilltop location and the famous Sheesh Mahal, or Mirror Palace, will leave you in awe. Don't miss the spectacular sound and light show. Start your visit early to avoid the heat, and consider booking a guided tour for the best historical insights.`
  }
];

async function generateVoiceOvers() {
  try {
    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();

    for (const destination of destinations) {
      const request = {
        input: { text: destination.script },
        voice: {
          languageCode: 'en-US',
          name: 'en-US-Neural2-D',
          ssmlGender: 'FEMALE'
        },
        audioConfig: { 
          audioEncoding: 'MP3',
          pitch: 0,
          speakingRate: 0.9
        },
      };

      // Performs the text-to-speech request
      const [response] = await client.synthesizeSpeech(request);
      const outputFile = join(__dirname, '..', 'public', 'voiceovers', `${destination.name.toLowerCase().replace(/\s+/g, '-')}.mp3`);
      
      // Write the binary audio content to a file
      writeFileSync(outputFile, response.audioContent, 'binary');
      console.log(`Audio content written to: ${outputFile}`);
    }

    console.log('Voice-overs generated successfully!');
  } catch (error) {
    console.error('Error generating voice-overs:', error);
  }
}

generateVoiceOvers(); 