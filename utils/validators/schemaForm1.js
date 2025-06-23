import * as yup from "yup";

const producaoSchema = yup.object({
  isHistorical: yup.boolean().required(),

  dataPlantio: yup.string().when("isHistorical", {
    is: true,
    then: (schema) => schema.required("Data do plantio é obrigatória"),
  }),

  dataColheita: yup.string().when("isHistorical", {
    is: true,
    then: (schema) => schema.required("Data da colheita é obrigatória"),
  }),

  dataPrevisaoPlantio: yup.string().when("isHistorical", {
    is: false,
    then: (schema) =>
      schema.required("Data de previsão do plantio é obrigatória"),
  }),

  dataPrevisaoColheita: yup.string().when("isHistorical", {
    is: false,
    then: (schema) =>
      schema.required("Data de previsão da colheita é obrigatória"),
  }),

  ilp: yup
    .string()
    .required("Indique se há Integração Lavoura Pecuária (ILP)")
    .oneOf(["true", "false"], "ILP deve ser Sim ou Não"),

  cultura: yup.object({
    codigo: yup.string().required("Código do cultivo e uso é obrigatório"),
  }),
});

export const form1Schema = yup.object({
  produtor: yup.object({
    cpf: yup
      .string()
      .required("CPF do produtor é obrigatório")
      .matches(/^\d{11}$/, "CPF deve conter 11 dígitos"),
  }),

  propriedade: yup.object({
    cnpj: yup
      .string()
      .required("CNPJ da propriedade é obrigatório")
      .matches(/^\d{14}$/, "CNPJ deve conter 14 dígitos"),

    codigoCar: yup.string().required("Código CAR é obrigatório"),

    codigoIbge: yup
      .string()
      .required("Código IBGE é obrigatório")
      .matches(/^\d{7}$/, "Código IBGE deve conter 7 dígitos"),
  }),

  talhao: yup.object({
    poligono: yup.string().required("Polígono do talhão é obrigatório"),
    area: yup
      .number()
      .typeError("Área deve ser um número")
      .positive("Área deve ser maior que zero")
      .required("Área é obrigatória"),
    tipoProdutor: yup
      .string()
      .required("Tipo do produtor é obrigatório")
      .oneOf(
        ["Proprietário", "Arrendatário"],
        "Tipo do produtor é obrigatório"
      ),
    plantioContorno: yup.string().required("Plantio em nível é obrigatório"),
  }),

  manejos: yup
    .array()
    .of(
      yup.object({
        data: yup.string().required("Data da operação é obrigatória"),
        operacao: yup.object({
          nomeOperacao: yup.string().required("Nome da operação é obrigatório"),
        }),
        tipoOperacao: yup.object({
          tipo: yup.string().required("Tipo da operação é obrigatório"),
        }),
      })
    )
    .min(1, "Ao menos uma operação mecanizada é obrigatória"),

  coberturas: yup
    .array()
    .of(
      yup.object({
        dataAvaliacao: yup.string().required("Data da avaliação é obrigatória"),
        porcentualPalhada: yup
          .number()
          .typeError("Porcentual deve ser um número")
          .required("Porcentual de palhada é obrigatório")
          .min(0, "Valor mínimo é 0%")
          .max(100, "Valor máximo é 100%"),
      })
    )
    .min(1, "É necessário informar ao menos uma cobertura de solo"),

  producoes: yup
    .array()
    .of(producaoSchema)
    .min(1, "É necessário informar ao menos uma produção"),
});
