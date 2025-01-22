/**
 * Valida um CPF com base no número de caracteres.
 * @param {string} cpf - CPF no formato "123.456.789-00" ou "12345678900".
 * @returns {boolean} Retorna true se o CPF for válido ou vazio, false caso contrário.
 */
export const validateCPF = (cpf) => {
  if (!cpf) return true; // CPF vazio ou não definido é considerado válido
  const cleanCPF = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
  return cleanCPF.length === 11; // Verifica se o CPF tem 11 caracteres
};
