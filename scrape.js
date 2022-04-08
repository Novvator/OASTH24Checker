//import libraries
const puppet = require('puppeteer');
const fs = require('fs');

// const { deepStrictEqual } = require('assert');

//create buses array to store Bus objects
var buses = [];

function Bus() {
  this.busno = '';
  this.busname = '';
  this.busdet = '';
  this.busariv = '';
} 

// let Bus = {
//   busno: '',
//   busname : '',
//   busdet : '',
//   busariv : ''
// }


async function scrapeProduct(url) {
  //launch page
  const browser = await puppet.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);


  //wait for elements to load and use querySelectorAll
  await page.waitForSelector('.arivals li .busariv');
  var busno = await page.$$('.arivals li .busno');
  var busname = await page.$$('.arivals li .busname')
  var busdet = await page.$$('.arivals li .busdet');
  var busariv = await page.$$('.arivals li .busariv');
  
  //create Bus objects in the buses array
  for(let y=0;y<busno.length;y++) {
    eval('var ' + 'bus' + y + '= new Bus();')
    eval('buses.push( bus' + y +');')
  }

  //loop through the elements and store them in Bus objects
  for(let i=0;i<busno.length;i++) {
    var no = busno[i]
    var name = busname[i]
    var det = busdet[i]
    var ariv = busariv[i]

    var l1 = await no.getProperty('textContent')
    var r1 = await l1.jsonValue()
    buses[i].busno = await r1;

    var l2 = await name.getProperty('textContent')
    var r2 = await l2.jsonValue()
    buses[i].busname = await r2;
    
    var l3 = await det.getProperty('textContent')
    var r3 = await l3.jsonValue()
    buses[i].busdet = await r3;

    var l4 = await ariv.getProperty('textContent')
    var r4 = await l4.jsonValue()
    buses[i].busariv = await r4;

    
    // console.log("busno: ",busno);

  }

  await browser.close();
}

//use main to store data in txt files and catch errors so that the loop doesn't stop
async function main(){

  await scrapeProduct('https://oasth.gr/#el/stopinfo/screen/1043/')

  //store all parsed data
  var alldata = JSON.stringify(buses,null,' ')
  fs.appendFile('alldata.txt',new Date() + alldata,function(err,result) {
    if(err) console.error(err);
  })

  //store 24 data exclusively
  try {
    var selectedbus = '24'
    var bus24 = buses.find(element => element.busno === selectedbus)
    var data24 = '\n' + new Date() + ' --- ' + bus24.busno + ' '  + bus24.busdet + ' ' + bus24.busariv
    fs.appendFile('data24.txt',data24,function(err,result) {
      if(err) console.error(err);
    })
  } catch (error) {
    console.error(error)
    var strno =   '\n' + new Date() + ' --- No ' + selectedbus + ' bus found'
    fs.appendFile('data24.txt',strno,function(err,result) {
      if(err) console.error(err)
    })
  }
  
  //clear buses array after every loop
  buses = []
  // console.log('looped')
  console.log(document.querySelector("div"));
  document.querySelector("#bus-list").innerHTML = data24
  
}

//execute main every amount of time defined
main()
const interval = setInterval(() => {
  main()
},20000)
