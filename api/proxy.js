export default async function handler(req, res) {
  try {
    const { cmd } = req.query;
    if (!cmd) return res.status(400).json({ error: "Lipsește parametrul cmd" });

    const espUrl = `http://poartamea.ddns.net:55000/${cmd}`;
    const response = await fetch(espUrl);
    const text = await response.text();

    res.status(200).send(text);

  } catch (error) {
    console.error("❌ Eroare proxy:", error);
    res.status(500).json({ error: "Eroare la conexiunea cu ESP32" });
  }
}
