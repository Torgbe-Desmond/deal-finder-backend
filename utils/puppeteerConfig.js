import puppeteer from 'puppeteer';

async function launchBrowser() {
    return await puppeteer.launch({
        headless: true, // Set to false for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
}

export default launchBrowser