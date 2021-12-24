/*
Collect editions
*/

const fs = require("fs"),
	path = require("path"),
	{promisify} = require("util"),
	readFileAsync = promisify(fs.readFile),
	writeFileAsync = promisify(fs.writeFile),
	puppeteer = require("puppeteer");

class App {

	constructor() {
	}

	async main() {
		const appURL = `file://${path.resolve("./src/index.html")}`;
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.setViewport({
			width: 1920,
			height: 1005,
			deviceScaleFactor: 1,
			isMobile: false,
			hasTouch: false,
			isLandscape: false
		});
		await page.goto(appURL,{waitUntil: "networkidle2"});
		// Gather output
		// Take screenshot and return it as image file data
		const pngScreenshot = await page.screenshot({type: "png", encoding: "base64"});
		await writeFileAsync(path.resolve("./output/screenshot.png"),pngScreenshot,"base64");
		const jsonScreenshot = {
			title: "lenticulator/screenshot.png",
			type: "image/png",
			text: pngScreenshot
		};
		await writeFileAsync(path.resolve("./output/tiddlers/lenticulator%2Fscreenshot.png.json"),JSON.stringify(jsonScreenshot));
		// Shut Puppeteer
		await browser.close();
	}
}

const app = new App();

app.main().then(() => {
	process.exit(0);
}).catch(err => {
	console.error(err);
	process.exit(1);
});
