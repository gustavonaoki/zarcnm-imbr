export const modeloSensoriamento = () => {
    return {
        dataInicial: "",
        dataFinal: "",
        declividadeMedia:"",
        plantioContorno:"",
        terraceamento:"",
        indices: [
            {
                satelite: "",
                coordenada: "",
                data: "",
                ndvi:"",
                ndti:"",
            },
        ],
        interpretacoesCultura: [
            {
                cultura: "",
                dataInicio: "",
                dataFim: "",
                coberturaSolo: "",
            },
        ],
        interpretacoesManejo: [
            {
                data: "",
                operacao: "",
                tipoOperacao: "",
            },
        ],
    }
};
