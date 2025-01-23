/**
 * Valida o campo Area.
 * Garante que o valor não seja negativo.
 * 
 * @param {number} area - Valor da área.
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */

export const validateArea = (area) => {

    
    const areaValue = parseFloat(area)

    if (isNaN(area)) {
        return "O valor da área deve ser um número.";
    }
    if (areaValue < 0){
        return "O valor da área não pode ser negativo."
    }
    
   
    return null;
}
