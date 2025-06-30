import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import InputField from "./inputField";
import { modeloSensoriamento } from "../modelos/modeloSensoriamento";
import { form3Schema } from "../utils/validators/schemaForm3";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Form3({ initialData, onChange }) {
  const methods = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    resolver: yupResolver(form3Schema),
    shouldUnregister: true, // ✅ garante que reset reatribua os campos corretamente
    defaultValues: {
      ...modeloSensoriamento(),
      ...(initialData?.[0] || {}),
    },
  });

  const { handleSubmit, control, watch, reset, getValues } = methods;

  const { fields: indices, append: appendIndice, remove: removeIndice } =
    useFieldArray({ control, name: "indices" });

  const {
    fields: culturas,
    append: appendCultura,
    remove: removeCultura,
  } = useFieldArray({ control, name: "interpretacoesCultura" });

  const {
    fields: manejos,
    append: appendManejo,
    remove: removeManejo,
  } = useFieldArray({ control, name: "interpretacoesManejo" });

  const {
    fields: coberturas,
    append: appendCobertura,
    remove: removeCobertura,
  } = useFieldArray({ control, name: "interpretacoesCoberturaSolo" });

  useEffect(() => {
    if (initialData?.length) {
      const data = initialData[0];

      reset({
        ...modeloSensoriamento(),
        ...data,
        indices: data.indices?.length
          ? data.indices
          : modeloSensoriamento().indices,
        interpretacoesCultura: data.interpretacoesCultura?.length
          ? data.interpretacoesCultura
          : modeloSensoriamento().interpretacoesCultura,
        interpretacoesManejo: data.interpretacoesManejo?.length
          ? data.interpretacoesManejo
          : modeloSensoriamento().interpretacoesManejo,
        interpretacoesCoberturaSolo: data.interpretacoesCoberturaSolo?.length
          ? data.interpretacoesCoberturaSolo
          : modeloSensoriamento().interpretacoesCoberturaSolo,
      });
    }
  }, [initialData, reset]);

  useEffect(() => {
    const subscription = watch((_, { type }) => {
      if (type === "blur") {
        const data = getValues();
        if (data?.cpfProdutor || data?.indices?.length > 0) {
          onChange(data);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, onChange]);

  return (
    <FormProvider {...methods}>
      <div className="container my-4">
        <div className="card border-0 shadow-sm">
          <div
            className="card-header text-white"
            style={{ backgroundColor: "#0b4809" }}
          >
            <h2 className="mb-0">Sensoriamento Remoto</h2>
          </div>
          <form
            onSubmit={handleSubmit(onChange)}
            className="card-body row gx-3 gy-4"
          >
            <InputField
              name="cpfProdutor"
              label="CPF do Produtor"
              required
              mask="999.999.999-99"
              placeholder="Ex: 000.000.000-00"
              className="col-md-6"
            />
            {/* <InputField
              name="cnpj"
              label="CNPJ da Propriedade"
              required
              mask="99.999.999/9999-99"
              className="col-md-6"
              readOnly
            /> */}
            <InputField
              name="dataInicial"
              label="Data Inicial do Monitoramento"
              type="date"
              required
              className="col-md-4"
            />
            <InputField
              name="dataFinal"
              label="Data Final do Monitoramento"
              type="date"
              required
              className="col-md-4"
            />
            <InputField
              name="declividadeMedia"
              label="Declividade Média da gleba/talhão (%)"
              type="number"
              placeholder="Ex: 10"
              required
              className="col-md-4"
            />
            <InputField
              name="plantioContorno"
              label="Plantio em Contorno"
              type="select"
              required
              options={[
                { value: "1", label: "Sim" },
                { value: "0", label: "Não" },
              ]}
              className="col-md-4"
            />
            <InputField
              name="terraceamento"
              label="Terraceamento"
              type="select"
              required
              options={[
                { value: "1", label: "Sim" },
                { value: "0", label: "Não" },
              ]}
              className="col-md-4"
            />

            {/* Índices */}
            {indices.map((_, index) => (
              <div key={index} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Índices (Nº {index + 1})</h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeIndice(index)}
                      disabled={indices.length === 1}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="card-body row gx-3 gy-3">
                    <InputField
                      name={`indices.${index}.data`}
                      label="Data da imagem do pixel"
                      type="date"
                      required
                      className="col-md-3"
                    />
                    <InputField
                      name={`indices.${index}.satelite`}
                      label="Nome do satélite"
                      placeholder="Ex: Sentinel"
                      required
                      className="col-md-3"
                    />
                    <InputField
                      name={`indices.${index}.coordenada`}
                      label="Coordenada do pixel (WKT)"
                      required
                      placeholder="Ex: POINT(40.71727401 -74.00898606)"
                      className="col-md-6"
                    />
                    <InputField
                      name={`indices.${index}.ndvi`}
                      label="NDVI"
                      type="number"
                      placeholder="Ex: 0.5"
                      required
                      className="col-md-3"
                    />
                    <InputField
                      name={`indices.${index}.ndti`}
                      label="NDTI"
                      type="number"
                      placeholder="Ex: 0.3"
                      required
                      className="col-md-3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  appendIndice({
                    satelite: "",
                    coordenada: "",
                    data: "",
                    ndvi: 0,
                    ndti: 0,
                  })
                }
              >
                + Adicionar Índice
              </button>
            </div>
            {/* Histórico de cobertura do solo em pré-semeadura */}
            {coberturas.map((_, index) => (
              <div key={index} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      Histórico de cobertura do solo em pré-semeadura (Nº{" "}
                      {index + 1})
                    </h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCobertura(index)}
                      disabled={coberturas.length === 1}
                    >
                      Remover
                    </button>
                  </div>

                  <div className="card-body row gx-3 gy-3">
                    <InputField
                      name={`interpretacoesCoberturaSolo.${index}.dataAvaliacao`}
                      label="Data da avaliação"
                      type="date"
                      required
                      className="col-md-6"
                    />
                    <InputField
                      name={`interpretacoesCoberturaSolo.${index}.porcentualPalhada`}
                      label="Cobertura do solo (%)"
                      type="number"
                      required
                      placeholder="Ex: 50"
                      className="col-md-6"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  appendCobertura({ dataAvaliacao: "", porcentualPalhada: "" })
                }
              >
                + Adicionar histórico de cobertura
              </button>
            </div>

            {/* Interpretações de Culturas */}
            {culturas.map((_, index) => (
              <div key={index} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      Interpretações das Culturas (Nº {index + 1})
                    </h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCultura(index)}
                      disabled={culturas.length === 1}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="card-body row gx-3 gy-3">
                    <InputField
                      name={`interpretacoesCultura.${index}.tipoCultivo`}
                      label="Cultivo"
                      setValueAs={(v) => String(v)}
                      className="col-md-6"
                      placeholder="Ex: Cultivo 2º safra"
                    />
                    <InputField
                      name={`interpretacoesCultura.${index}.dataInicio`}
                      label="Data de Emergência"
                      type="date"
                      required
                      className="col-md-3"
                    />
                    <InputField
                      name={`interpretacoesCultura.${index}.dataFim`}
                      label="Data da Colheita"
                      type="date"
                      required
                      className="col-md-3"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  appendCultura({
                    tipoCultivo: "",
                    dataInicio: "",
                    dataFim: "",
                  })
                }
              >
                + Adicionar interpretações das culturas
              </button>
            </div>

            {/* Interpretações de Manejo */}
            {manejos.map((_, index) => (
              <div key={index} className="col-12">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">
                      Operações mecanizadas realizadas na gleba (Nº {index + 1})
                    </h5>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeManejo(index)}
                      disabled={manejos.length === 1}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="card-body row gx-3 gy-3">
                    <InputField
                      name={`interpretacoesManejo.${index}.data`}
                      label="Data da última operação"
                      type="date"
                      required
                      className="col-md-3"
                    />
                    <InputField
                      name={`interpretacoesManejo.${index}.operacao`}
                      label="Operações mecanizadas"
                      required
                      placeholder="Ex: Revolvimento do solo"
                      className="col-md-4"
                    />
                    <InputField
                      name={`interpretacoesManejo.${index}.tipoOperacao`}
                      label="Tipo de operação"
                      required
                      placeholder="Ex: ARAÇÃO"
                      className="col-md-4"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 ">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  appendManejo({ data: "", operacao: "", tipoOperacao: "" })
                }
              >
                + Adicionar operação mecanizada
              </button>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
