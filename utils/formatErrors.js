export function formatErrors(error) {
  try {
    // 🆕 Tenta parsear se for uma string JSON válida
    if (typeof error === "string") {
      try {
        const parsed = JSON.parse(error);
        error = parsed; // continua tratando como objeto abaixo
      } catch {
        return error; // string normal, retorna como está
      }
    }

    // Trata erro.raw como string JSON
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

    // Trata objeto com fields e title diretamente
    if (error?.fields && error?.title) {
      const campos = Object.entries(error.fields)
        .map(([campo, msg]) => `• ${campo}: ${msg}`)
        .join("\n");
      return `${error.title}\n${campos}`;
    }

    // Trata objeto com detail
    if (error?.detail) return error.detail;

    return JSON.stringify(error, null, 2);
  } catch (err) {
    return "Erro inesperado ao processar a mensagem de erro.";
  }
}
