export const modeloCadastroGleba = () => {
  return {
    produtor: {
      nome: "",
      cpf: "",
    },
    propriedade: {
      nome: "",
      cnpj: "",
      codigoCar: "",
      codigoIbge: "",
      poligono: "",
    },
    talhao: {
      poligono: "",
      area: "",
      tipoProdutor: "",
      plantioContorno: "",
    },
    manejos: [
      {
        data: "",
        operacao: { nomeOperacao: "" },
        tipoOperacao: { tipo: "" },
      },
    ],
    coberturas: [
      {
        dataAvaliacao: "",
        porcentualPalhada: "",
      },
    ],
    producoes: [
      {
        isHistorical: true, // apenas para controlar estado
        dataPlantio: "",
        dataColheita: "",
        ilp: "",
        cultura: { nome: "", codigo: "" },
      },
      // Próximo cultivo inicial
      {
        isHistorical: false, // apenas para controlar estado
        dataPrevisaoPlantio: "",
        dataPrevisaoColheita: "",
        ilp: "",
        cultura: { nome: "", codigo: "" },
      },
    ],
  };
};
