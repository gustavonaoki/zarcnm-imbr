/**
 * Valida um código IBGE.
 * @param {string | number} codigoIBGE - O código IBGE a ser validado.
 * @returns {boolean | string} Retorna true se válido, ou uma mensagem de erro se inválido.
 */
export function validateIBGE(codigoIBGE) {
    const codigoString = String(codigoIBGE).trim();
  
    // Exemplo de validação: código IBGE deve ter 7 dígitos
    if (!/^\d{7}$/.test(codigoString)) {
      return "Código IBGE deve conter exatamente 7 dígitos.";
    }
  
    return true; // Código válido
  }
  