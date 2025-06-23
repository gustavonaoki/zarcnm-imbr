export default async function handler(req, res) {
  const response = await fetch(process.env.AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: process.env.USER,
      password: process.env.PASSWORD,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: data.error_description || "Erro ao autenticar" });
  }

  return res.status(200).json(data);
}
