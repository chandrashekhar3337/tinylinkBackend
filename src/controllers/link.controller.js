import linkService from "../services/link.service.js";

// POST /api/links
export const createLink = async (req, res) => {
  const { code, targetUrl } = req.body;

  if (!code || !targetUrl)
    return res.status(400).json({ error: "Code & URL required" });

  const exists = await linkService.getLink(code);
  if (exists) return res.status(400).json({ error: "Code already exists" });

  const link = await linkService.createLink(code, targetUrl);
  res.json(link);
};

// GET /api/links
export const listLinks = async (req, res) => {
  const links = await linkService.getAllLinks();
  res.json(links);
};

// GET /api/links/:code (STATS ONLY – NO REDIRECT)
export const getStats = async (req, res) => {
  const code = req.params.code;
  const link = await linkService.getLink(code);

  if (!link) return res.status(404).json({ error: "Invalid Code" });

  res.json(link);   // Return stats
};

// DELETE /api/links/:code
export const deleteLink = async (req, res) => {
  try {
    await linkService.deleteLink(req.params.code);
    res.json({ ok: true });
  } catch {
    res.status(404).json({ error: "Not found" });
  }
};
