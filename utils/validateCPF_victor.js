// Validador de CPF
export const validateCPF = (cpf) => {
    if (!cpf) return true; // Verifica se o CPF está definido
    const cleanCPF = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cleanCPF.length !== 11) {
        return false;
    }
    return true;

}