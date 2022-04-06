const puppet = require('puppeteer');
const fs = require('fs');
const { deepStrictEqual } = require('assert');

var str = ''

async function scrapeProduct(url) {
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);


  
  await page.waitForSelector('.arivals li .busariv');
  const busno = await page.$$('.arivals li');
  //const busname = await page.$$('.arivals .busname');
  //const busdet = await page.$$('.arivals .busdet');
  //const busariv = await page.$$('.arivals .busariv');
  
  for(let i=0;i<busno.length;i++) {
    const row = busno[i]


    const label = await row.getProperty('textContent')
    const raw = await label.jsonValue()

    
    str += await raw + '\n'


  }
  console.log(str)

  

  await browser.close();

}

scrapeProduct('https://oasth.gr/#el/stopinfo/screen/1043/')

//fs.writeFile('output.txt',str)