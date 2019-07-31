const puppeteer = require('puppeteer');

let execute = true;

console.log('pts <domain> <path1> <path2>')

const first = process.argv[2] + process.argv[3];
const second = process.argv[4];
const runs = 5;
const throttle = false;

if(execute) {
    const result = [];
    (async () => {

        const width = 1280;
        const height = 1024;

        const browser = await puppeteer.launch( { headless: false, defaultViewport: null, args: [
            `--window-size=${ width },${ height }`
        ] } );

        const page = await browser.newPage();


        if(throttle) {
            // Connect to Chrome DevTools
            const client = await page.target().createCDPSession();

            // Set throttling property
            await client.send('Network.emulateNetworkConditions', {
                'offline': false,
                'downloadThroughput': 300 * 1024 / 8,
                'uploadThroughput': 300 * 1024 / 8,
                'latency': 100
            });
        }

       for(let i =0; i < runs; i++) {
            await page.goto(first, { waitUntil: 'networkidle2' });
      
            // var newHrefs = await page.$$eval('a', function (anchors) {
            //   return anchors.map(anchor => anchor.href)
            // });
          
            const linkToClick = await page.$(`a[href='${second}'`);
            if(linkToClick) {
                const start = new Date();
                await linkToClick.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2' });
                const stop = new Date();
                result.push((stop - start));
            } else {
                const newHrefs = await page.$$eval('a', function (anchors) {
                    return anchors.map(anchor => anchor.getAttribute('href'));
                });
                console.log('link to', second,'not found on page');
                console.log('available links:');
                newHrefs.forEach( e => console.log(e));
                break;
            }
        }
      
        await browser.close();
        if(result.length > 0) {
            console.log(result);
        }
    })();
}
