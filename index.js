'use strict';

const puppeteer = require('puppeteer');
const resultsSelector = '.js-product-info';
const taskData = {
  proxy: {
    url: 'https://snkrs-us-S48.chicooked.io:33128',
    userName: '8HtvXIZ6!a8',
    password: 'paseRiJw'
  },
  keywords: {
    positive: ['hospital', 'blue', '700,'],
    negative: ['infant', 'kid', 'kids', 'infants']
  },
  size: '10'
};
(async (d) => {
  const browser = await puppeteer.launch({
    args: [
      d.proxy.url,
    ]
  });

  const page = await browser.newPage();
  await page.authenticate({
    username: d.proxy.userName,
    password: d.proxy.password
  });

  await page.goto('https://yeezysupply.com/');
  await page.waitForSelector(resultsSelector);
  const productArr = await page.evaluate(resultsSelector => {
    const products = Array.from(document.querySelectorAll(resultsSelector));
    const data = {
      keywords: {
        positive: ['hospital', 'blue', '700,'],
        negative: ['infant', 'kid', 'kids', 'infants']
      },
    }
    for (let product of products) {
      const htmlString = product.innerText.trim().toLowerCase();
      let valid = false;
      for (let keyword in data.keywords.positive) {
        if (htmlString.indexOf(keyword) >= 0) {
          valid = true;
        }
      }

      if (valid === true) {
        return htmlString;
      }
    }
  }, resultsSelector);

  console.log(productArr);
  await browser.close();
})(taskData);