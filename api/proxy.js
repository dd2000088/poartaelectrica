// File: api/proxy.js
export default async function handler(req, res) {
  try {
    // Preia comanda din query string: /api/proxy?cmd=ddeesscchhiiddee
    const { cmd } = req.query;

    if (!cmd) {
      return res.status(400).json({ error: "Lipsește parametrul cmd" });
    }

    // URL corect ESP32 prin DDNS
   const espUrl = `http://poartamea.ddns.net:8080/${cmd}`;


    // Trimite cererea către ESP32
    const response = await fetch(espUrl);
    const text = await response.text();

    // Returnează răspunsul ESP32
    res.status(200).send(text);
  } catch (error) {
    console.error("❌ Eroare proxy:", error);
    res.status(500).json({ error: "Eroare la conexiunea cu ESP32" });
  }
}
