export function formatErrors(error) {
  try {
    // Se for string simples, retorna direto
    if (typeof error === "string") return error;

    // Se tiver erro.raw como string JSON, tenta parsear
    if (typeof error?.raw === "string") {
      const parsed = JSON.parse(error.raw);
      if (parsed?.detail) return parsed.detail;
      if (parsed?.title && parsed?.fields) {
        const campos = Object.entries(parsed.fields)
          .map(([campo, msg]) => `• ${campo}: ${msg}`)
          .join("\n");
        return `${parsed.title}\n${campos}`;
      }
      return JSON.stringify(parsed, null, 2);
    }

    // Se for objeto direto com detail
    if (error?.detail) return error.detail;

    // Se for objeto com fields e título
    if (error?.fields && error?.title) {
      const campos = Object.entries(error.fields)
        .map(([campo, msg]) => `• ${campo}: ${msg}`)
        .join("\n");
      return `${error.title}\n${campos}`;
    }

    return JSON.stringify(error, null, 2);
  } catch (err) {
    return "Erro inesperado ao processar a mensagem de erro.";
  }
}
