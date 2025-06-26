import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "./inputField";
import { modeloAnaliseSolo } from "../modelos/modeloAnaliseSolo";
import { useEffect, useRef } from "react";
import { form2Schema } from "../utils/validators/schemaForm2";
import { debounce } from "lodash";

export default function Form2({ initialData, onChange }) {
  const isFirstRender = useRef(true);
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(form2Schema),
    defaultValues: {
      cpfProdutor: initialData?.cpfProdutor || "",
      cnpj: initialData?.cnpj || "",
      amostras: initialData?.amostras || [
        { ...modeloAnaliseSolo(), camada: "20" },
        { ...modeloAnaliseSolo(), camada: "20" },
        { ...modeloAnaliseSolo(), camada: "40" },
        { ...modeloAnaliseSolo(), camada: "40" },
      ],
    },
  });

  const {
    watch,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "amostras",
  });

  useEffect(() => {
    if (initialData) {
      const amostrasValidas =
        initialData.amostras && initialData.amostras.length > 0
          ? initialData.amostras
          : [
              { ...modeloAnaliseSolo(), camada: "20" },
              { ...modeloAnaliseSolo(), camada: "20" },
              { ...modeloAnaliseSolo(), camada: "40" },
              { ...modeloAnaliseSolo(), camada: "40" },
            ];

      reset({
        cpfProdutor: initialData.cpfProdutor || "",
        cnpj: initialData.cnpj || "",
        amostras: amostrasValidas,
      });

      replace(amostrasValidas);
    }
  }, [initialData, reset, replace]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        }

        onChange(data);
      }, 10)
    );

    return () => subscription.unsubscribe();
  }, [watch, onChange]);


  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onChange)} className="row gx-0">
        <h2 className="mb-4 text-center">Análises de Solo</h2>
        {fields.map((_, index) => (
          <div key={index} className="card mb-4 border-0">
            <div className="border-2">
              <div
                className="card-header text-white d-flex justify-content-between align-items-center"
                style={{ backgroundColor: "#0b4809" }}
              >
                <h3 className="mb-0">Análise {index + 1}</h3>
                {index >= 4 && (
                  <button
                    type="button"
                    className="btn btn-danger btn-sm d-flex align-items-center"
                    onClick={() => remove(index)}
                  >
                    <i className="bi bi-trash-fill me-2"></i> Remover
                  </button>
                )}
              </div>

              <div className="card-body">
                <div className="row mb-6">
                  <InputField
                    name="cpfProdutor"
                    label="CPF do Produtor:"
                    className="col-md-6"
                    mask="999.999.999-99"
                    readOnly
                  />

                  <InputField
                    name="cnpj"
                    label="CNPJ da Propriedade:"
                    mask="99.999.999/9999-99"
                    className="col-md-6"
                    readOnly
                  />

                  <InputField
                    name={`amostras.${index}.cpfResponsavelColeta`}
                    label="CPF do Responsável:"
                    mask="999.999.999-99"
                    className="col-md-6"
                    required
                  />

                  <InputField
                    name={`amostras.${index}.dataColeta`}
                    label="Data da Coleta:"
                    type="date"
                    className="col-md-6"
                    required
                  />
                </div>

                <InputField
                  name={`amostras.${index}.pontoColeta`}
                  label="Ponto de Coleta:"
                  type="textarea"
                  className="col-md-12"
                  required
                />

                <div className="row mb-4">
                  <InputField
                    name={`amostras.${index}.camada`}
                    label="Camada:"
                    type="select"
                    required
                    options={[
                      { value: "10", label: "10 - (0 - 10 cm)" },
                      { value: "20", label: "20 - (0 - 20 cm)" },
                      { value: "40", label: "40 - (20 - 40 cm)" },
                      { value: "60", label: "60 - (40 - 60 cm)" },
                      { value: "100", label: "100 - (60 - 100 cm)" },
                    ]}
                    className="col-md-12"
                  />
                </div>
              </div>
              {/* Divisão entre Informações Físicas e Químicas */}
              <div className="row m-2">
                <div className="col-md-6">
                  <div className="card mb-3" style={{ borderColor: "#20691a" }}>
                    <div
                      className="card-header text-white"
                      style={{ backgroundColor: "#20691a" }}
                    >
                      <h4 className="mb-0">Informações Físicas</h4>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <InputField
                          name={`amostras.${index}.areia`}
                          label="Areia (%)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div className="mb-3">
                        <InputField
                          name={`amostras.${index}.silte`}
                          label="Silte (%)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.argila`}
                          label="Argila (%)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card mb-3" style={{ borderColor: "#20691a" }}>
                    <div
                      className="card-header text-white"
                      style={{ backgroundColor: "#20691a" }}
                    >
                      <h4 className="mb-0">Informações Químicas</h4>
                    </div>
                    <div
                      className="card-body overflow-auto"
                      style={{ maxHeight: "289px" }}
                    >
                      <div className="mb-3">
                        <InputField
                          name={`amostras.${index}.calcio`}
                          label="Cálcio (cmolc/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div className="mb-3">
                        <InputField
                          name={`amostras.${index}.magnesio`}
                          label="Magnésio (cmolc/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.potassio`}
                          label="Potássio (mg/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.sodio`}
                          label="Sódio (mg/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.aluminio`}
                          label="Alumínio (cmolc/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.acidezPotencial`}
                          label="Acidez Potencial (cmolc/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.phh2o`}
                          label="pH H₂O"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.phcaci`}
                          label="pH CaCl₂"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.fosforoMehlich`}
                          label="Fósforo Mehlich (mg/dm³)"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.fosforoResina`}
                          label="Fósforo Resina (mg/dm³)"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.enxofre`}
                          label="Enxofre (mg/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.mos`}
                          label="MOS (g/dm³)"
                          type="number"
                          required
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.arilsulfatase`}
                          label="Arilsulfatase (mg PNP Kg-1 h-1)"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.betaGlicosedade`}
                          label="Beta-glicosidase (PNP Kg-1 h-1)"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                      <div>
                        <InputField
                          name={`amostras.${index}.densidadeSolo`}
                          label="Densidade do solo (g/cm³)"
                          type="number"
                          className="col-md-12"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="d-flex m-3 justify-content-between">
          <button
            type="button"
            onClick={() => append(modeloAnaliseSolo())}
            className="btn"
            style={{ backgroundColor: "#25526d", color: "white" }}
          >
            <i className="bi bi-plus-lg me-2"></i>Adicionar Nova Análise
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
