export default async function handler(req, res) {
  try {
    const url = process.env.PA_PLANTS_URL;
    if (!url) return res.status(500).json({ ok:false, error:"PA_PLANTS_URL not set" });

    const r = await fetch(url, { method: "GET" });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
}
