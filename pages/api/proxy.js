// pages/api/proxy.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const response = await axios.post("https://api.imbragro.com/login", req.body, {
      headers: { "Content-Type": "application/json" },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Erro no proxy:", error);
    return res.status(500).json({ error: "Erro ao conectar com a API externa" });
  }
}
