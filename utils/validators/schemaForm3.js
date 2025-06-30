import * as yup from "yup";

const indiceSchema = yup.object().shape({
  data: yup.string().required("Data da imagem do pixel é obrigatória"),
  satelite: yup.string().required("Satélite é obrigatório"),
  coordenada: yup.string().required("Coordenada (WKT) é obrigatória"),
  ndvi: yup
    .number()
    .typeError("NDVI deve ser um número")
    .min(0, "NDVI deve ser maior ou igual a 0")
    .max(1, "NDVI deve ser menor ou igual a 1")
    .required("NDVI é obrigatório"),
  ndti: yup
    .number()
    .typeError("NDTI deve ser um número")
    .min(0, "NDTI deve ser maior ou igual a 0")
    .max(1, "NDTI deve ser menor ou igual a 1")
    .required("NDTI é obrigatório"),
});

const culturaSchema = yup.object().shape({
  dataInicio: yup.string().required("Data de emergência é obrigatória"),
  dataFim: yup.string().required("Data da colheita é obrigatória"),
});

const manejoSchema = yup.object().shape({
  data: yup.string().required("Data é obrigatória"),
  operacao: yup.string().required("Operação é obrigatória"),
  tipoOperacao: yup
    .string()
    .transform((value) => value?.toLocaleUpperCase("pt-BR"))
    .required("Tipo de operação é obrigatório"),
});

export const form3Schema = yup.object().shape({
  cpfProdutor: yup
    .string()
    .required("CPF do produtor é obrigatório")
    .matches(/^\d{11}$/, "CPF inválido, deve conter 11 números"),

  dataInicial: yup
    .string()
    .required("Data inicial do monitoramento é obrigatória"),

  dataFinal: yup.string().required("Data final do monitoramento é obrigatória"),

  declividadeMedia: yup
    .number()
    .typeError("Declividade deve ser um número")
    .min(0, "Valor mínimo: 0%")
    .max(100, "Valor máximo: 100%")
    .required("Declividade média é obrigatória"),

  plantioContorno: yup.string().required("Plantio em contorno é obrigatório"),

  terraceamento: yup.string().required("Terraceamento é obrigatório"),

  indices: yup.array().of(indiceSchema).min(1, "Adicione ao menos um índice"),

  interpretacoesCultura: yup
    .array()
    .of(culturaSchema)
    .min(1, "Adicione ao menos uma cultura"),

  interpretacoesManejo: yup
    .array()
    .of(manejoSchema)
    .min(1, "Adicione ao menos um manejo"),

  interpretacoesCoberturaSolo: yup
    .array()
    .of(
      yup.object().shape({
        dataAvaliacao: yup.string().required("Data da avaliação é obrigatória"),
        porcentualPalhada: yup
          .number()
          .typeError("Cobertura deve ser um número")
          .min(0, "Valor mínimo: 0%")
          .max(100, "Valor máximo: 100%")
          .required("Cobertura do solo é obrigatória"),
      })
    )
    .min(1, "Adicione ao menos um histórico de cobertura"),
});
