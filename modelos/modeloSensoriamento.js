export const modeloSensoriamento = () => {
  return {
    cpfProdutor: "",
    dataInicial: "",
    dataFinal: "",
    declividadeMedia: "",
    plantioContorno: "",
    terraceamento: "",
    indices: [
      {
        satelite: "",
        coordenada: "",
        data: "",
        ndvi: "",
        ndti: "",
      },
    ],
    interpretacoesCoberturaSolo: [
      {
        dataAvaliacao: "",
        porcentualPalhada: "",
      },
    ],
    interpretacoesCultura: [
      {
        tipoCultivo: "",
        dataInicio: "",
        dataFim: "",
      },
    ],
    interpretacoesManejo: [
      {
        data: "",
        operacao: "",
        tipoOperacao: "",
      },
    ],
  };
};
