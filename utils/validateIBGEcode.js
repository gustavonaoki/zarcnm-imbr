/**
 * Valida um código IBGE.
 * @param {string | number} codigoIBGE - O código IBGE a ser validado.
 * @returns {boolean | string} Retorna true se válido, ou uma mensagem de erro se inválido.
 */
export function validateIBGE(codigoIBGE) {

  const codigoIBGEValue = parseFloat(codigoIBGE);

    if (isNaN(codigoIBGEValue)) {
        return "O código do IBGE deve ser um número.";
    }

    if (codigoIBGEValue < 0) {
        return "O código do IBGE não pode ser negativo.";
    }

    const codigoString = String(codigoIBGE).trim();

    // Exemplo de validação: código IBGE deve ter 7 dígitos
    if (!/^\d{7}$/.test(codigoString)) {
      return "O código IBGE deve conter exatamente 7 dígitos.";
    }
  
    return true; // Código válido
  }
  