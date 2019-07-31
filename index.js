const puppeteer = require('puppeteer');

let execute = true;

function test(url, link, headless = true, runs = 5, throttle = false) {
    const first = url;
    const second = link;

    if (execute) {
        const result = [];
        (async () => {
            try {

                const width = 1280;
                const height = 1024;

                const browser = await puppeteer.launch({
                    headless: headless, defaultViewport: null, args: [
                        `--window-size=${width},${height}`
                    ]
                });

                const page = await browser.newPage();


                if (throttle) {
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

                for (let i = 0; i < runs; i++) {
                    await page.goto(first, { waitUntil: 'networkidle2' });

                    const linkToClick = await page.$(`a[href='${second}'`);
                    if (linkToClick) {
                        const start = new Date();
                        await linkToClick.click();
                        await page.waitForNavigation({ waitUntil: 'networkidle2' });
                        const stop = new Date();
                        result.push((stop - start));
                    } else {
                        const newHrefs = await page.$$eval('a', function (anchors) {
                            return anchors.map(anchor => anchor.getAttribute('href'));
                        });
                        console.log('link to', second, 'not found on page');
                        console.log('available links:');
                        newHrefs.forEach(e => console.log(e));
                        break;
                    }
                }

                await browser.close();
                if (result.length > 0) {
                    console.log(result);
                }
            } catch (error) {
                console.error(error.message)
            }
        })();
    }

}

module.exports = test