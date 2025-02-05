/**
 * Valida um POLYGON no formato WKT.
 * @param {string} wktString - O POLYGON WKT a ser validado.
 * @returns {boolean | string} Retorna true se válido, ou uma mensagem de erro se inválido.
 */
export function validateWKTPolygon(wktString) {

    if (wktString === null || wktString === undefined  || wktString.trim() === '') {
        return;
    }

    const trimmedWKT = wktString.trim();

    // Regex para validar o formato POLYGON((x y, x y, ...))
    const WKT_REGEX = /^POLYGON\(\(\s*(-?\d+(\.\d+)?\s-?\d+(\.\d+)?)(,\s*-?\d+(\.\d+)?\s-?\d+(\.\d+)?)*\s*\)\)$/;

    if (!WKT_REGEX.test(trimmedWKT)) {
        return "Formato inválido! O POLYGON deve seguir o padrão: POLYGON((x y, x y, ...)).";
    }

    return true; // WKT válido
}
