export async function getAccessToken() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        username: process.env.NEXT_PUBLIC_USERNAME,
        password: process.env.NEXT_PUBLIC_PASSWORD,
      }),
    });

    const data = await res.json();

    if (!res.ok)
      throw new Error(
        data.error_description || data.error || "Erro ao buscar token"
      );

    return data.access_token;
  } catch (error) {
    throw new Error("Erro ao obter token: " + error.message);
  }
}
