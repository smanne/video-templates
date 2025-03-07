import React from 'react';
import { Composition, registerRoot, staticFile } from 'remotion';
import { Video } from './components/Video';

const slides = [
  {
    type: 'overview',
    title: 'Stock Overview',
    subtitle: 'Current Market Analysis',
    stockName: 'Arman Financial Services Ltd',
    stockSymbol: 'ARMANFIN',
    currentPrice: 1276,
    priceChange: -0.20,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1080&h=1920&fit=crop',
    metrics: [
      {
        label: '52 Week High',
        value: '₹2,541.70',
        change: '49.52% below',
        trend: 'down',
      },
      {
        label: 'P/E Ratio',
        value: '14.51',
        change: '41.28% below industry avg',
        trend: 'down',
      },
      {
        label: 'Book Value',
        value: '₹775.70',
        change: '118.23% YoY',
        trend: 'up',
      },
    ],
  },
  {
    type: 'technical',
    title: 'Technical Analysis',
    subtitle: 'Key Technical Indicators',
    stockName: 'Arman Financial Services Ltd',
    stockSymbol: 'ARMANFIN',
    image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1080&h=1920&fit=crop',
    metrics: [
      {
        label: 'RSI',
        value: '43.42',
        change: 'Neutral',
        trend: 'neutral',
      },
      {
        label: 'MACD',
        value: '-27.92',
        change: 'Bearish',
        trend: 'down',
      },
      {
        label: 'ADX',
        value: '16.23',
        change: 'Weak Trend',
        trend: 'neutral',
      },
    ],
    bulletPoints: [
      'Stock in defined downtrend but approaching oversold territory',
      'Weak trend strength with ADX below 20',
      'Potential for short-term relief rallies',
    ],
  },
  {
    type: 'fundamental',
    title: 'Fundamental Analysis',
    subtitle: 'Financial Performance',
    stockName: 'Arman Financial Services Ltd',
    stockSymbol: 'ARMANFIN',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1080&h=1920&fit=crop',
    metrics: [
      {
        label: 'Revenue Growth',
        value: '-5.4%',
        change: 'Quarter-on-Quarter',
        trend: 'down',
      },
      {
        label: 'Net Profit',
        value: '-₹7.26 Cr',
        change: '79.1% decline QoQ',
        trend: 'down',
      },
      {
        label: 'ROE',
        value: '10.82%',
        change: '7.69% decline YoY',
        trend: 'down',
      },
    ],
    bulletPoints: [
      'Revenue declined for three consecutive quarters',
      'Shift from profitability to losses in recent quarter',
      'Significant deterioration in net profit margin',
    ],
  },
  {
    type: 'forecast',
    title: '2025 Price Projections',
    subtitle: 'Machine Learning Based Forecast',
    stockName: 'Arman Financial Services Ltd',
    stockSymbol: 'ARMANFIN',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1080&h=1920&fit=crop',
    metrics: [
      {
        label: 'Mid-2025 Target',
        value: '₹1,550.03',
        change: '21.5% upside',
        trend: 'up',
      },
      {
        label: 'End-2025 Target',
        value: '₹1,742.59',
        change: '36.6% upside',
        trend: 'up',
      },
    ],
    bulletPoints: [
      'Projections based on historical patterns',
      'Assumes potential mean reversion',
      'Subject to fundamental improvement',
    ],
  },
  {
    type: 'recommendation',
    title: 'Investment Recommendation',
    subtitle: 'Based on Technical & Fundamental Analysis',
    stockName: 'Arman Financial Services Ltd',
    stockSymbol: 'ARMANFIN',
    image: 'https://images.unsplash.com/photo-1579226905180-636b76d96082?w=1080&h=1920&fit=crop',
    bulletPoints: [
      'Significant fundamental challenges persist',
      'Technical indicators suggest oversold conditions',
      'High debt-to-asset ratio of 0.68 poses risk',
      'Declining institutional ownership is concerning',
    ],
    recommendation: 'HOLD',
  },
];

const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Stock"
        component={Video}
        durationInFrames={slides.length * 300} // 10 seconds per slide
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          slides,
          backgroundMusic: staticFile("/news.mp3")
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot); 