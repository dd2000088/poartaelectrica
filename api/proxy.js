// File: api/proxy.js
export default async function handler(req, res) {
  try {
    // Preia calea din URL, ex: /api/proxy/ddeesscchhiiddee
    const command = req.url.replace("/api/proxy", "");
    const espUrl = `http://poartameelectrica.ddns.net${command}`;

    // Trimite cererea către ESP32
    const response = await fetch(espUrl);
    const text = await response.text();

    // Returnează răspunsul ESP32
    res.status(200).send(text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Eroare la conexiunea cu ESP32" });
  }
}

