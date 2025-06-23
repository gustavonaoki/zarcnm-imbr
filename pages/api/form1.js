import { getAccessToken } from "../../infra/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const token = await getAccessToken();

    const response = await fetch(`${process.env.API_URL}/api/v1/glebas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req.body),
    });

    const contentType = response.headers.get("content-type");
    let parsedResponse;

    if (contentType && contentType.includes("application/json")) {
      parsedResponse = await response.json();
    } else {
      const text = await response.text();
      console.warn("⚠️ Resposta não-JSON recebida:", text);
      parsedResponse = { raw: text };
    }

    if (!response.ok) {
      return res.status(response.status).json({ error: parsedResponse });
    }

    return res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("🔥 Erro interno na rota /api/form1:", error);
    return res.status(500).json({ error: error.message });
  }
}
