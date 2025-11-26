import express from "express";
import { createLink, listLinks, getStats, deleteLink } from "../controllers/link.controller.js";

const router = express.Router();

router.get("/", listLinks);
router.post("/", createLink);
router.get("/:code", getStats);   // Stats only
router.delete("/:code", deleteLink);

export default router;
