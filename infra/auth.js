export async function getAccessToken() {
  try {
    const res = await fetch(process.env.AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "password",
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        username: process.env.USER,
        password: process.env.PASSWORD,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(
        data.error_description || data.error || "Erro ao buscar token"
      );
    }

    return data.access_token;
  } catch (error) {
    throw new Error("Erro ao obter token: " + error.message);
  }
}
