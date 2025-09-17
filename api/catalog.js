export default async function handler(req, res) {
  try {
    const base = process.env.PA_CATALOG_URL;
    if (!base) return res.status(500).json({ ok:false, error:"PA_CATALOG_URL not set" });

    // Clonamos la URL de PA (que ya trae ?api-version=...&sig=... etc.)
    const url = new URL(base);

    // Pasamos los query del cliente (planta_id, fecha, modo)
    for (const [k, v] of Object.entries(req.query || {})) {
      if (v != null) url.searchParams.set(k, v);
    }

    const r = await fetch(url.toString(), { method: "GET" });
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
}
