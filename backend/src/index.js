import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthcheck } from "./db.js";
import authRouter from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  try {
    await healthcheck();
    res.json({ status: "ok" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Database unavailable", details: err.message });
  }
});

app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
