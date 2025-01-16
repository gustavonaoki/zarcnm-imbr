/**
 * Valida se o CPF é válido, considerando pontos e traços.
 * @param {string} cpf - O CPF a ser validado.
 * @returns {string | null} - Retorna uma mensagem de erro ou null se for válido.
 */
export const validateCPF = (cpf) => {
  // Remove pontos, traços e outros caracteres não numéricos
  const cleanedCPF = cpf.replace(/[^\d]/g, "");

  // Verifica se o CPF contém exatamente 11 dígitos numéricos
  if (!/^\d{11}$/.test(cleanedCPF)) {
    return "O CPF deve conter exatamente 11 dígitos numéricos.";
  }

  // Adicione aqui uma validação mais rigorosa para CPF se necessário (cálculo dos dígitos verificadores)

  return null; // CPF válido
};
