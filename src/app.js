import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import linkRoutes from "./routes/link.routes.js";
import linkService from "./services/link.service.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health Check
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// API ROUTES
app.use("/api/links", linkRoutes);

// REDIRECT HANDLER (Frontend /code/:code se click hota hai)
app.get("/r/:code", async (req, res) => {
  const code = req.params.code;
  const link = await linkService.getLink(code);

  if (!link) return res.status(404).send("Invalid Code");

  // COUNT INCREASE
  await linkService.incrementClick(code);

  // Redirect
  return res.redirect(302, link.targetUrl);
});

export default app;
