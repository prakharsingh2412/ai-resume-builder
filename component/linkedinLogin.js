import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";

puppeteer.use(StealthPlugin());

const linkedinLogin = async () => {
  const browser = await puppeteer.launch({ headless: false }); // ⬅️ headless: false so you can see login
  const page = await browser.newPage();

  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "networkidle2",
  });

  // Enter your LinkedIn credentials here
  await page.type("#username", "prakharsingh9876543@gmail.com");
  await page.type("#password", "Prakhar#01");

  await Promise.all([
    page.click('[type="submit"]'),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);

  console.log("✅ Logged in to LinkedIn!");

  // Save cookies
  const cookies = await page.cookies();
  fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));

  console.log("✅ Cookies saved to cookies.json");

  await browser.close();
};

linkedinLogin();
