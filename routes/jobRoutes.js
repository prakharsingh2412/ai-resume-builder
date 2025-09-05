import express from "express";
import scrapeJob from "../scraper/linkedInScraper.js";
import getJobDetails from "../controllers/jobController.js";

const router = express.Router();

// scrape LinkedIn job & save to DB
// jobRoutes.js
router.post("/scrape", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: "Job URL required" });

  try {
    const jobData = await scrapeJob(url);
    if (!jobData) return res.status(500).json({ message: "Scraping failed" });

    const jobDoc = await getJobDetails(jobData);

    res.json({
      message: "Job scraped and saved ✅",
      job: jobDoc,
    });
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
