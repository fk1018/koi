'use strict';

const puppeteer = require('puppeteer');
const resultsSelector = '.js-product-info';
const taskData = {
  proxy: {
    url: 'snkrs-us-S154.chicooked.io:33128',
    userName: '8HtvXIZ6!a1',
    password: 'paseRiJw'
  },
  keywords: {
    positive: ['bt', 'dsrt', 'salt,'],
    negative: ['infant', 'kid', 'kids', 'infants']
  },
  size: '10'
};
(async (d) => {
  const browser = await puppeteer.launch({
    args: [
      `--proxy-server=${d.proxy.url}`,
    ]
  });

  const page = await browser.newPage();
  await page.authenticate({
    username: d.proxy.userName,
    password: d.proxy.password
  });

  await page.goto('https://yeezysupply.com/');
  await page.waitForSelector(resultsSelector);
  const productText = await page.evaluate((resultsSelector,keywords) => {
    const $productsArr = Array.from(document.querySelectorAll(resultsSelector));
    return $productsArr.map($product=>$product.innerText.indexOf('DSRT')>=0);
  }, resultsSelector,d.keywords);
  
  console.log(productText);
  await browser.close();
})(taskData);