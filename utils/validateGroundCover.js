/**
 * Valida o campo Cobertura do Solo.
 * Garante que o valor não seja negativo ou maior que 100.
 * 
 * @param {number|string} area - Valor da cobertura do solo.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */

export const validateGroundCover = (area) => {
    if (area === null || area === undefined || area === "") {
        return "O valor da cobertura do solo é obrigatório.";
    }

    const areaValue = parseFloat(area);

    if (isNaN(areaValue)) {
        return "O valor da cobertura do solo deve ser um número.";
    }

    if (areaValue < 0) {
        return "O valor da cobertura do solo não pode ser negativo.";
    }

    if (areaValue > 100) {
        return "O valor da cobertura do solo não pode ser maior que 100%.";
    }

    return null;
};
