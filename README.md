# Amazon Product Video Generator

This project generates Instagram-style videos from Amazon product data using Remotion. It scrapes product information, including images, ratings, and review summaries, and creates engaging videos with text-to-speech narration.

## Features

- Scrapes top 10 Amazon products from a specified category
- Extracts product images, ratings, and review summaries
- Generates engaging video content using Remotion
- Adds text-to-speech narration
- Exports in Instagram-compatible format

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your configuration:
```
AMAZON_CATEGORY=your-category
```

3. Run the script:
```bash
npm start
```

4. Build the video:
```bash
npm run build
```

## Requirements

- Node.js 14+
- FFmpeg installed on your system
- Internet connection for scraping and TTS

## Note

This tool is for educational purposes only. Please ensure you comply with Amazon's terms of service and robots.txt when scraping data. 