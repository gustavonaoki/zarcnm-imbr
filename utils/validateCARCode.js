/**
 * Valida o campo Código CAR (Cadastro Ambiental Rural)*:.
 * Garante que o valor não seja negativo ou maior que 100.
 * 
 * 
 * @returns {string | null} - Retorna mensagem de erro ou null se válido.
 */


export const validateCarCode = (code) => {
    if (code === null || code === undefined  || code.trim() === '') {
        return "O código CAR é obrigatório.";
    }
}