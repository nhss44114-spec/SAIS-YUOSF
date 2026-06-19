import express from "express";
import path from "path";
import https from "https";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const fileId = "1M7Y9lcxlZbmesy8U9cNFsn3IT8In0-xW";
const videoDir = path.join(process.cwd(), "src", "assets");
const localVideoPath = path.join(videoDir, "novox_video.mp4");

// Automatically start background cache of the video to ensure absolute fluidity and responsiveness
try {
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }
} catch (error: any) {
  console.warn(`[Video Downloader] Could not declare/create directory ${videoDir}: ${error.message}`);
}

function downloadGoogleDriveVideo(fileId: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const directUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
    console.log(`[Video Downloader] Downloading video from direct URL: ${directUrl}`);
    
    https.get(directUrl, (res) => {
      // If we need to follow an unexpected redirect
      if ((res.statusCode === 302 || res.statusCode === 301 || res.statusCode === 303) && res.headers.location) {
        console.log(`[Video Downloader] Following redirect to: ${res.headers.location}`);
        https.get(res.headers.location, (redirRes) => {
          if (redirRes.statusCode !== 200) {
            reject(new Error(`Download failed with status ${redirRes.statusCode}`));
            return;
          }
          const fileStream = fs.createWriteStream(destPath);
          redirRes.pipe(fileStream);
          fileStream.on("finish", () => {
            fileStream.close();
            resolve();
          });
          fileStream.on("error", (err) => {
            fs.unlink(destPath, () => {});
            reject(err);
          });
        }).on("error", reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`Download failed with status ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });

      fileStream.on("error", (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on("error", reject);
  });
}

// Start caching in the background on launch
if (!fs.existsSync(localVideoPath)) {
  downloadGoogleDriveVideo(fileId, localVideoPath)
    .then(() => {
      console.log(`[Video Downloader] Robot video loaded and cached perfectly at: ${localVideoPath}`);
    })
    .catch((err) => {
      console.error("[Video Downloader] Failed to cache background video:", err.message);
    });
} else {
  console.log(`[Video Downloader] Robot video is already present in cache.`);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Fully buffered/streaming Range proxy to serve Google Drive HD video flawlessly in Safari, Chrome and mobile browsers with 0 CORS issues!
  app.get("/api/video", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Range, Content-Type");
    
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
      return;
    }

    // If we have cached the file successfully, serve it with full Range headings support instantly!
    if (fs.existsSync(localVideoPath)) {
      const stat = fs.statSync(localVideoPath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize || end >= fileSize) {
          res.status(416).send("Requested range not satisfiable\n" + start + " - " + end + " / " + fileSize);
          return;
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(localVideoPath, { start, end });
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4",
        };

        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(200, head);
        fs.createReadStream(localVideoPath).pipe(res);
      }
      return;
    }

    // Dynamic backup stream proxy if it hasn't finished caching yet
    const googleDriveUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
    const headers: Record<string, string> = {};
    if (req.headers.range) {
      headers["range"] = req.headers.range;
    }

    res.setHeader("Cache-Control", "public, max-age=86400");

    function fetchStream(targetUrl: string) {
      https.get(targetUrl, { headers }, (proxyRes) => {
        if ((proxyRes.statusCode === 302 || proxyRes.statusCode === 301) && proxyRes.headers.location) {
          fetchStream(proxyRes.headers.location);
          return;
        }

        if (proxyRes.headers["content-type"]) {
          res.setHeader("content-type", proxyRes.headers["content-type"]);
        } else {
          res.setHeader("content-type", "video/mp4");
        }
        if (proxyRes.headers["content-length"]) {
          res.setHeader("content-length", proxyRes.headers["content-length"]);
        }
        if (proxyRes.headers["content-range"]) {
          res.setHeader("content-range", proxyRes.headers["content-range"]);
        }
        if (proxyRes.headers["accept-ranges"]) {
          res.setHeader("accept-ranges", proxyRes.headers["accept-ranges"]);
        }

        res.writeHead(proxyRes.statusCode || 200);
        proxyRes.pipe(res);
      }).on("error", (err) => {
        console.error("Video proxy error:", err);
        res.status(500).send("Video retrieval issue");
      });
    }

    fetchStream(googleDriveUrl);
  });

  // Hot module substitution & development static middlewares for Vite
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server loaded securely, playing on http://localhost:${PORT}`);
  });
}

startServer();
