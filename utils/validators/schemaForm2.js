import * as yup from "yup";

const amostraSchema = yup
  .object()
  .shape({
    cpfResponsavelColeta: yup
      .string()
      .matches(/^\d{11}$/, "CPF inválido")
      .required("CPF do responsável é obrigatório"),

    dataColeta: yup.string().required("Data da coleta é obrigatória"),
    pontoColeta: yup.string().required("Ponto de coleta é obrigatório"),
    camada: yup.string().required("Camada é obrigatória"),

    areia: yup
      .number()
      .typeError("Areia é obrigatória")
      .min(0, "Valor mínimo é 0%")
      .max(100, "Valor máximo é 100%")
      .required("Areia é obrigatória"),

    silte: yup
      .number()
      .typeError("Silte é obrigatória")
      .min(0, "Valor mínimo é 0%")
      .max(100, "Valor máximo é 100%")
      .required("Silte é obrigatória"),

    argila: yup
      .number()
      .typeError("Argila é obrigatória")
      .min(0, "Valor mínimo é 0%")
      .max(100, "Valor máximo é 100%")
      .required("Argila é obrigatória")
      .test("soma-100", function (_, ctx) {
        const { areia = 0, silte = 0, argila = 0 } = ctx.parent;
        const soma = (areia || 0) + (silte || 0) + (argila || 0);

        const arredondado = Math.round(soma * 100) / 100;

        return soma === 100
          ? true
          : ctx.createError({
              message: `Areia + Silte + Argila deve ser igual a 100% (atualmente: ${arredondado}%)`,
            });
      }),

    calcio: yup
      .number()
      .typeError("Cálcio é obrigatório")
      .required("Cálcio é obrigatório"),

    magnesio: yup
      .number()
      .typeError("Magnésio é obrigatório")
      .required("Magnésio é obrigatório"),

    potassio: yup
      .number()
      .typeError("Potássio é obrigatório")
      .required("Potássio é obrigatório"),

    sodio: yup
      .number()
      .typeError("Sódio é obrigatório")
      .required("Sódio é obrigatório"),

    aluminio: yup
      .number()
      .typeError("Alumínio é obrigatório")
      .required("Alumínio é obrigatório"),

    acidezPotencial: yup
      .number()
      .typeError("Acidez potencial é obrigatória")
      .required("Acidez potencial é obrigatória"),

    phh2o: yup
      .number()
      .transform((v, o) => (o === "" ? null : v))
      .nullable()
      .typeError("pH H₂O deve ser um número"),

    phcaci: yup
      .number()
      .transform((v, o) => (o === "" ? null : v))
      .nullable()
      .typeError("pH CaCl₂ deve ser um número"),

    fosforoMehlich: yup
      .number()
      .transform((v, o) => (o === "" ? null : v))
      .nullable()
      .typeError("Fósforo Mehlich deve ser um número"),

    fosforoResina: yup
      .number()
      .transform((v, o) => (o === "" ? null : v))
      .nullable()
      .typeError("Fósforo Resina deve ser um número"),

    enxofre: yup
      .number()
      .typeError("Enxofre é obrigatório")
      .required("Enxofre é obrigatório"),

    mos: yup
      .number()
      .typeError("MOS é obrigatória")
      .required("MOS é obrigatória"),
  })
  .test(
    "ph-required",
    "Informe pH em H₂O ou CaCl₂",
    (value) => value.phh2o != null || value.phcaci != null
  )
  .test(
    "fosforo-required",
    "Informe fósforo Mehlich ou Resina",
    (value) => value.fosforoMehlich != null || value.fosforoResina != null
  );

export const form2Schema = yup.object({
  cpfProdutor: yup
    .string()
    .matches(/^\d{11}$/, "CPF inválido")
    .required("CPF do produtor é obrigatório"),

  amostras: yup
    .array()
    .of(amostraSchema)
    .min(1, "Adicione ao menos uma amostra"),
});
