import express from "express";
import cors from "cors";
import { tiktok } from "tiktok-scraper-without-watermark";

const app = express();
app.use(cors());

app.get("/api/download", async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const data = await tiktok(url);

    return res.json({
      downloadUrl: data.video.noWatermark,
    });
  } catch (e) {
    return res.status(500).json({ error: "Video fetch failed", details: e.toString() });
  }
});

app.listen(3000, () => {
  console.log("Backend running on port 3000");
});
