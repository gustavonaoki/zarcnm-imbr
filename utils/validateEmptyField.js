/**
 * Valida o campo data (genérico).
 * 
 * 
 * 
 * @returns {boolean | string} Retorna true se válido, ou uma mensagem de erro se inválido.
 */


export const validateEmptyField = (value) => {
   
    
    if (value === null || value === undefined || value.trim() === '') {
        return "Este campo é obrigatório.";
    }

    return true; // Código válido

}