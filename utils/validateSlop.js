/**
 * Valida o campo Declividade média.
 * Garante que o valor não seja negativo ou maior que 100.
 * 
 * @param {number|string} slope - Valor da declividade.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */
export const validateSlope = (slope) => {
    const slopeValue = parseFloat(slope);

    if (isNaN(slopeValue)) {
        return "O valor da declividade média deve ser um número.";
    }

    if (slopeValue < 0) {
        return "O valor da declividade média não pode ser negativo.";
    }

    if (slopeValue > 100) {
        return "O valor da declividade média não pode ser maior que 100%.";
    }

    return null;
};
