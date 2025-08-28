export default async function handler(req, res) {
  try {
    // Preia comanda din query string
    const { path } = req.query;
    if (!path) {
      return res.status(400).json({ error: "Lipsește parametrul ?path=" });
    }

    // URL ESP32
    const espUrl = `http://poartameelectrica.ddns.net/${path}`;

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
