import puppeteer from "puppeteer";
import fs from "fs";

function normalizeUrl(rawUrl) {
  if (!rawUrl) return null;
  // Convert collections URL → direct job view URL
  const match = rawUrl.match(/currentJobId=(\d+)/);
  if (match) {
    return `https://www.linkedin.com/jobs/view/${match[1]}/`;
  }
  return rawUrl;
}

export default async function scrapeJob(rawUrl) {
  if (!rawUrl) {
    console.error("❌ scrapeJob: No URL provided");
    return null;
  }

  const jobUrl = normalizeUrl(rawUrl);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // ✅ Load cookies before navigation
  if (fs.existsSync("cookies.json")) {
    const cookies = JSON.parse(fs.readFileSync("cookies.json", "utf8"));
    await page.setCookie(...cookies);
    console.log(" Cookies loaded into Puppeteer");
  } else {
    console.warn("No cookies.json found. Login may fail.");
  }

  // ✅ Navigate
  await page.goto(jobUrl, { waitUntil: "networkidle2", timeout: 60000 });

  // Debug screenshot
  await page.screenshot({ path: "debug.png", fullPage: true });

  // ✅ Extract job details
  const job = await page.evaluate(() => {
    const title = document.querySelector(".top-card-layout__title")?.innerText.trim() || "";
    const company =
      document.querySelector(".top-card-layout__second-subline .topcard__org-name-link")?.innerText.trim() || "";
    const location =
      document.querySelector(".top-card-layout__second-subline .topcard__flavor--bullet")?.innerText.trim() || "";
    const description =
      document.querySelector(".show-more-less-html__markup")?.innerText.trim() || "";

    return { title, company, location, description };
  });

  await browser.close();

  if (!job.title) {
    console.error("Failed to scrape job details, check debug.png");
    return null;
  }

  return { ...job, jobUrl };
}
