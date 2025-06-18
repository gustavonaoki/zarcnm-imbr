import { getAccessToken2 } from "../../infra/auth2";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { chaveClassificacaoNM, ...form2Data } = req.body;

  if (!chaveClassificacaoNM) {
    return res
      .status(400)
      .json({ error: "chaveClassificacaoNM é obrigatória." });
  }

  try {
    const token = await getAccessToken2();

    console.log("📦 Form2 recebido do Front:", JSON.stringify(form2Data, null, 2));

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/analises-solo/${chaveClassificacaoNM}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form2Data),
      }
    );

    const raw = await response.text();
    console.log("📥 Resposta da API externa (Form2):", raw);

    if (!response.ok) {
      console.error("❌ Erro da API externa (Form2):", raw);
      return res.status(response.status).json({ error: raw });
    }

    try {
      const parsed = JSON.parse(raw);
      return res.status(200).json(parsed);
    } catch {
      return res.status(200).json({ rawResponse: raw });
    }
  } catch (error) {
    console.error("🔥 Erro interno /api/form2:", error);
    return res.status(500).json({ error: error.message });
  }
}
