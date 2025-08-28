// File: api/proxy.js
export default async function handler(req, res) {
  try {
    // ia comanda din query: /api/proxy?cmd=ddeesscchhiiddee
    const { cmd } = req.query;

    if (!cmd) {
      return res.status(400).json({ error: "Lipsește parametrul cmd" });
    }

    // adresa DDNS a ESP32
    const espUrl = `http://poartameelectrica.ddns.net/${cmd}`;

    // trimite comanda către ESP32
    const response = await fetch(espUrl);
    const text = await response.text();

    // returnează răspunsul ESP32
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la conexiunea cu ESP32" });
  }
}
