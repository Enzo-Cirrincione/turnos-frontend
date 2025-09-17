export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok:false, error:"Method not allowed" });
    }
    const url = process.env.PA_BOOK_URL;
    if (!url) return res.status(500).json({ ok:false, error:"PA_BOOK_URL not set" });

    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {})
    });

    // PA devuelve 200/202; levantamos body igual
    const data = await r.json().catch(() => ({}));
    res.status(r.status === 200 ? 200 : 502).json(data);
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
}
