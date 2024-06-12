const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const screenshot = await page.screenshot();
  await browser.close();

  res.type('image/png');
  res.send(screenshot);

  res.end();

  console.log('Sent screenshot');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const gracefulShutdown = () => {
    console.log('Received shutdown signal. Shutting down...');
    process.exit(0);
};
  
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
