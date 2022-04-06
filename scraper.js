const puppet = require('puppeteer');
const fs = require('fs')

var str = ''

async function scrapeProduct(url) {
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.goto(url);

  
  //const [el] = await page.$x('/html/body/div[10]/div[3]/div/div[2]/div[3]/ul/li[5]/span[4]/strong')
  //await page.waitForSelector('.arivals .busno');
  //const busno = await page.$$('.arivals .busno');
  await page.waitForSelector('.arivals li .busno');
  const busno = await page.$$('.arivals li .busno');
  //const busname = await page.$$('.arivals .busname');
  //const busdet = await page.$$('.arivals .busdet');
  //const busariv = await page.$$('.arivals .busariv');
  //const arr = []
  //const arr2 = []
  
  for(let i=0;i<busno.length;i++) {
    const row = busno[i]

    //const label = await row.$eval('li:nth-of-type(1)', element => element.textContent)
    const label = await row.getProperty('textContent')
    const raw = await label.jsonValue()

    
    str += await raw + '\n'
    //console.log(raw + '\n')


  }
  console.log(str)
  //const txt1 = await busno.getProperty('textContent');
  //const txt2 = await busname.getProperty('textContent');
  //const txt3 = await busdet.getProperty('textContent');
  //const txt4 = await busariv.getProperty('textContent');

  //await arr.forEach(element => {
//
  //  arr2.push(element.jsonValue())
  //  
  //});
  //const raw1 = await txt1.jsonValue()
  //const raw2 = await txt2.jsonValue()
  //const raw3 = await txt3.jsonValue()
  //const raw4 = await txt4.jsonValue()

  await browser.close();
  
  //console.log(arr)

}

scrapeProduct('https://oasth.gr/#el/stopinfo/screen/1043/')
//scrapeProduct('https://www.amazon.com/Elden-Ring-PlayStation-4/dp/B07SPYK271/ref=lp_16225016011_1_11?th=1')

