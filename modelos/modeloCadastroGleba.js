export const modeloCadastroGleba = () => {
    return {
        produtor: {
            nome: "",
            cpf: "",
        },
        propriedade: {
            nome: "",
            codigoCar: "",
            codigoIbge: "",
            poligono: "",
        },
        talhao: {
            poligono: "",
            area: 0,
            tipoProdutor: "",
        },
        manejos: [
            {
                data: "",
                operacao: { nomeOperacao: "" },
                tipoOperacao: { tipo: "" },
            },
        ],
        producoes: [
            {
                dataPlantio: "",
                dataColheita: "",
                dataPrevisaoPlantio: "",
                dataPrevisaoColheita: "",
                coberturaSolo: "",
                ilp: "",
                cultura: { nome: "" },
                tipoOperacao: { tipo: "" },
                isHistorical: true,
            },
        ],
    }
};
