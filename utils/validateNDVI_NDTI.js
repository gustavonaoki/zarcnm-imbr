/**
 * Valida os campos NDVI e NDTI.
 * Garante que o valor não seja negativo ou maior que 100.
 * 
 * @param {number|string} NDVI - Valor do NDVI.
 * @param {number|string} NDTI - Valor do NDVI.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */
export const validateNDVI = (NDVI) => {

    const NDVIvalue =  parseFloat(NDVI);
    if (isNaN(NDVIvalue)) {
        return "NDVI precisa ser um número.";
    }
    if ( NDVIvalue < -1 || NDVIvalue > 1) {
        return "NDVI precisa estar entre -1 e 1."
    }
    return null;
};

export const validateNDTI = (NDTI) => {

    const NDTIvalue =  parseFloat(NDTI);
    if (isNaN(NDTIvalue)) {
        return "NDTI precisa ser um número.";
    }
    if ( NDTIvalue < -1 || NDTIvalue > 1) {
        return "NDTI precisa estar entre -1 e 1."
    }
    return null;
};
