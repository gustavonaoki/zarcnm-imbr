/**
 * Valida os campos Argila, Areia e Silte.
 * Garante que os valores não sejam negativos e que a soma seja exatamente 100.
 * 
 * @param {number} argila - Valor de argila.
 * @param {number} areia - Valor de areia.
 * @param {number} silte - Valor de silte.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */
export const validateSoilComponents = (argila, areia, silte) => {
    // Converte os valores para números (trata valores vazios como 0)
    const argilaValue = parseFloat(argila) || 0;
    const areiaValue = parseFloat(areia) || 0;
    const silteValue = parseFloat(silte) || 0;
  
    // Verifica valores negativos
    if (argilaValue < 0 || areiaValue < 0 || silteValue < 0) {
      return "Os valores de Argila, Areia e Silte não podem ser negativos.";
    }
  
    // Verifica soma maior ou menor que 100
    const soma = argilaValue + areiaValue + silteValue;
    if (soma > 100) {
      return "A soma de Argila, Areia e Silte não pode ser maior que 100.";
    } else if (soma < 100) {
      return "A soma de Argila, Areia e Silte deve ser exatamente 100.";
    }
  
    return null; // Tudo válido
  };
  