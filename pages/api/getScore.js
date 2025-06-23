import { getAccessToken } from "../../infra/auth";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { chave } = req.query;

  if (!chave) {
    return res
      .status(400)
      .json({ error: "Parâmetro 'chave' é obrigatório na URL." });
  }

  try {
    const token = await getAccessToken();

    const response = await fetch(
      `${process.env.API_URL}/api/v1/classificacoes/${chave}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const contentType = response.headers.get("content-type");
    const data = contentType?.includes("application/json")
      ? await response.json()
      : { raw: await response.text() };

    if (!response.ok) {
      console.error("❌ Erro ao obter score:", data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("🔥 Erro interno na rota /api/getScore:", error);
    return res.status(500).json({ error: error.message });
  }
}
