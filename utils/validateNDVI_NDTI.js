/**
 * Valida os campos NDVI e NDTI.
 * Garante que o valor não seja negativo ou maior que 100.
 * 
 * @param {number|string} NDVI - Valor do NDVI.
 * @param {number|string} NDTI - Valor do NDVI.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */
export const validateNDVI = (NDVI) => {

    if (NDVI === null || NDVI === undefined || NDVI.trim() === '') {
        return "NDVI precisa ser um número.";
    }
    if ( NDVI < -1 || NDVI > 1) {
        return "NDVI precisa estar entre -1 e 1."
    }
    return true;
};

export const validateNDTI = (NDTI) => {

    
    if (NDTI === null || NDTI === undefined || NDTI.trim() === '') {
        return "NDTI precisa ser um número.";
    }
    if ( NDTI < -1 || NDTI > 1) {
        return "NDTI precisa estar entre -1 e 1."
    }
    return true;
};
