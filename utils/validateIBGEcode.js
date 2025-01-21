/**
 * Valida o campo ibgecode.
 * Garante que o valor não seja negativo e que a tenha exatamente 7 digitos.
 * 
 * @param {number} ibgeCode - Valor do código do IBGE.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */

export const validateIBGECode = (ibgeCode) => {
    const ibgeCodeValue = parseFloat(ibgeCode) || 0 

    if (ibgeCodeValue < 0){
        return "O valor do código do IBGE não pode ser negativo."
    }
    // Convertendo o valor para string para verificar o comprimento
    const ibgeCodeStr = ibgeCode.toString();

    if (ibgeCodeStr.length !== 7) {
        return "O código do IBGE tem que ter 7 digitos.";
    }
    return null;
}
