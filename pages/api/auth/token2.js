export default async function handler(req, res) {
  const response = await fetch(process.env.NEXT_PUBLIC_AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "password",
      username: process.env.NEXT_PUBLIC_USERNAME2,
      password: process.env.NEXT_PUBLIC_PASSWORD2,
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
