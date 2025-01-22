export const modeloSensoriamento = () => {
    return {
        dataInicial: "",
        dataFinal: "",
        declividadeMedia: 0,
        plantioContorno: 0,
        terraceamento: 0,
        indices: [
            {
                satelite: "",
                coordenada: "",
                data: "",
                ndvi: 0,
                ndti: 0,
            },
        ],
        interpretacoesCultura: [
            {
                cultura: "",
                dataInicio: "",
                dataFim: "",
                coberturaSolo: 0,
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
