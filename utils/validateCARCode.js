/**
 * Valida o campo Código CAR (Cadastro Ambiental Rural)*:.
 * 
 * 
 * 
 * @returns {boolean | string} Retorna true se válido, ou uma mensagem de erro se inválido.
 */


export const validateCarCode = (code) => {
    if (code === null || code === undefined  || code.trim() === '') {
        return "O código CAR é obrigatório.";
    }

    return true; // Código válido

}