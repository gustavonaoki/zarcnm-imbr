import { getAccessToken2 } from "../../infra/auth2";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { chaveClassificacaoNM, ...form3Data } = req.body;

  if (!chaveClassificacaoNM) {
    return res
      .status(400)
      .json({ error: "chaveClassificacaoNM é obrigatória." });
  }

  try {
    const token = await getAccessToken2();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/sensoriamentos-remotos/${chaveClassificacaoNM}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form3Data),
      }
    );

    const raw = await response.text();

    if (!response.ok) {
      console.error("❌ Erro da API externa (Form3):", raw);
      return res.status(response.status).json({ error: raw });
    }

    try {
      const parsed = JSON.parse(raw);
      return res.status(200).json(parsed);
    } catch {
      return res.status(200).json({ rawResponse: raw });
    }
  } catch (error) {
    console.error("🔥 Erro interno /api/form3:", error);
    return res.status(500).json({ error: error.message });
  }
}
