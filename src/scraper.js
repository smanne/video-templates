require('dotenv').config();
const puppeteer = require('puppeteer');
const { getAudioUrl } = require('google-tts-api');
const fs = require('fs');

async function scrapeAmazonProducts(category) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 60000
  });
  const page = await browser.newPage();
  
  // Set viewport and user agent
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Set headers to look more like a real browser
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
  });
  
  // Navigate to Amazon category page
  await page.goto(`https://www.amazon.com/s?k=${encodeURIComponent(category)}&ref=nb_sb_noss`, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  // Wait for product elements to load
  await page.waitForSelector('.s-result-item', { timeout: 60000 });
  
  // Extract product information
  const products = await page.evaluate(() => {
    const items = document.querySelectorAll('.s-result-item');
    return Array.from(items).slice(0, 10).map(item => {
      const title = item.querySelector('h2 span')?.textContent || '';
      const price = item.querySelector('.a-price-whole')?.textContent || '';
      const rating = item.querySelector('.a-icon-star-small')?.textContent || '';
      const imageUrl = item.querySelector('img')?.src || '';
      const productUrl = item.querySelector('a.a-link-normal')?.href || '';
      
      return {
        title,
        price,
        rating,
        imageUrl,
        productUrl
      };
    });
  });
  
  await browser.close();
  return products;
}

async function getProductDetails(productUrl) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    timeout: 60000
  });
  const page = await browser.newPage();
  
  // Set viewport and user agent
  await page.setViewport({ width: 1920, height: 1080 });
  
  // Set headers to look more like a real browser
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0'
  });
  
  await page.goto(productUrl, {
    waitUntil: 'networkidle0',
    timeout: 60000
  });
  
  // Extract pros and cons from reviews
  const details = await page.evaluate(() => {
    const pros = Array.from(document.querySelectorAll('.review-text-content'))
      .slice(0, 3)
      .map(el => el.textContent.trim());
    
    const cons = Array.from(document.querySelectorAll('.review-text-content'))
      .slice(3, 6)
      .map(el => el.textContent.trim());
    
    return { pros, cons };
  });
  
  await browser.close();
  return details;
}

async function generateNarration(product) {
  const text = `Check out ${product.title}. It's rated ${product.rating} stars and costs ${product.price} dollars.`;
  const audioUrl = await getAudioUrl(text, {
    lang: 'en',
    slow: false,
    host: 'https://translate.google.com',
  });
  return audioUrl;
}

async function main() {
  const category = process.env.AMAZON_CATEGORY || 'best sellers';
  
  console.log(`Scraping top 10 products from category: ${category}`);
  const products = await scrapeAmazonProducts(category);
  
  for (const product of products) {
    console.log(`Processing product: ${product.title}`);
    
    // Get additional product details
    const details = await getProductDetails(product.productUrl);
    product.details = details;
    
    // Generate narration
    product.narrationUrl = await generateNarration(product);
  }
  
  // Save products data for video generation
  fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
  
  console.log('Product data saved to products.json');
  console.log('Run npm run preview to preview the video');
  console.log('Run npm run build to generate the video');
}

main().catch(console.error); 