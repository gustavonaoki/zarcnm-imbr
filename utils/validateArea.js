/**
 * Valida o campo Area.
 * Garante que o valor não seja negativo.
 * 
 * @param {number} area - Valor da área.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */

export const validateArea = (area) => {
    const areaValue = parseFloat(area) || 0 

    if (areaValue < 0){
        return "O valor da área não pode ser negativo."
    }
    
   
    return null;
}
