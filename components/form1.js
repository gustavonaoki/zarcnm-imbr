import {
  useForm,
  FormProvider,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { form1Schema } from "../utils/validators/schemaForm1";
import { modeloCadastroGleba } from "../modelos/modeloCadastroGleba";
import InputField from "./inputField";
import { culturaOptions } from "../optionsInputs/culturas";
import { useEffect } from "react";
import { debounce } from "lodash";
import HelpButton from "./helpButton";

export default function Form1({ onChange, initialData }) {
  const methods = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(form1Schema),
    defaultValues: initialData || modeloCadastroGleba(),
  });

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  useEffect(() => {
    const handleChange = debounce((data) => {
      onChange(data);
    }, 400);

    const subscription = watch((data, { type }) => {
      if (type === "change" || type === "blur") {
        handleChange(data);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const {
    fields: producoes,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "producoes",
  });

  const {
    fields: coberturas,
    append: appendCobertura,
    remove: removeCobertura,
  } = useFieldArray({
    control,
    name: "coberturas",
  });

  const historicos = producoes.filter((p) => String(p.isHistorical) === "true");
  const idxProximo = producoes.findIndex(
    (p) => String(p.isHistorical) === "false"
  );

  const coberturasData = useWatch({ control, name: "coberturas" });
  const valoresCobertura =
    coberturasData?.map((c) => c.porcentualPalhada) || [];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onChange)} className="row gx-3 gy-4">
        <div className="container my-4">
          <h1 className="text-center">Formulário de Cadastro</h1>
          <h6 className="text-danger text-center">
            Todos os campos com ( * ) são obrigatórios
          </h6>

          <div className="mb-4 card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">Dados do Produtor</h2>
            </div>

            <div className="card-body">
              <div className="row gx-3 gy-4">
                <InputField
                  name="produtor.nome"
                  label="Nome:"
                  placeholder="Ex: José da Silva"
                  className="col-md-6"
                />

                <InputField
                  name="produtor.cpf"
                  label="CPF:"
                  required
                  placeholder="000.000.000-00"
                  mask="999.999.999-99"
                  className="col-md-6"
                />
              </div>
            </div>
          </div>

          {/* próxima seção */}
          <div className="mb-4 card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">Dados da propriedade</h2>
            </div>

            <div className="card-body">
              {/* <div>
                <InputField
                  name="propriedade.cnpj"
                  label="CNPJ:"
                  placeholder="00.000.000/0000-00"
                  mask="99.999.999/9999-99"
                  className="col-md-12 mb-3"
                  required
                />
              </div> */}
              <div>
                <InputField
                  name="propriedade.nome"
                  label="Nome da propriedade:"
                  placeholder="Ex: Fazenda Santa Maria"
                  className="col-md-12 mb-3"
                />
              </div>
              <div>
                <InputField
                  name="propriedade.codigoCar"
                  label="Código CAR:"
                  required
                  placeholder="Ex: MT-5107248-1025F299474640148FE845C7A0B62699"
                  className="col-md-12 mb-3"
                />
              </div>
              <div>
                <InputField
                  name="propriedade.codigoIbge"
                  label="Código IBGE:"
                  placeholder="Ex: 1234567"
                  mask="9999999"
                  className="col-md-12 mb-3"
                  required
                />
              </div>
              <div>
                <InputField
                  name="propriedade.poligono"
                  label="Polígono (Formato WKT):"
                  placeholder="Ex: POLYGON((x y, x y, ...))"
                  className="col-md-12 mb-3"
                  type="textarea"
                />
              </div>
            </div>
          </div>
          {/* Dados da Gleba/Talhão */}
          <div className="mb-4 card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">Dados da Gleba/Talhão</h2>
            </div>

            <div className="card-body">
              <div className="row gx-3 gy-4">
                <InputField
                  name="talhao.poligono"
                  label="Polígono (Formato WKT):"
                  required
                  placeholder="Ex: POLYGON((x y, x y, ...))"
                  className="col-md-12 mb-3"
                  type="textarea"
                />

                <InputField
                  name="talhao.area"
                  label="Área (Em hectares):"
                  required
                  type="number"
                  placeholder="Ex: 10"
                  className="col-md-6 mb-3"
                />

                <InputField
                  name="talhao.tipoProdutor"
                  label="Tipo de Produtor:"
                  className="col-md-6 mb-3"
                  required
                  type="select"
                  options={[
                    { value: "Proprietário", label: "Proprietário" },
                    { value: "Arrendatário", label: "Arrendatário" },
                  ]}
                />

                <InputField
                  name="talhao.plantioContorno"
                  label="Plantio em Nivel:"
                  className="col-md-6 mb-3"
                  required
                  type="select"
                  options={[
                    { value: 1, label: "Sim" },
                    { value: 0, label: "Não" },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Operações mecanizadas realizadas na gleba: */}
          <div className="mb-4 card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">Operações Mecanizadas</h2>
            </div>
            <div className="card-body">
              <div className="row gx-3 gy-3">
                <InputField
                  name="manejos.0.data"
                  label="Data da operação:"
                  type="date"
                  className="col-md-4"
                  required
                />
                <InputField
                  name="manejos.0.operacao.nomeOperacao"
                  label="Nome da operação:"
                  placeholder="Ex: Revolvimento do solo"
                  className="col-md-4"
                  required
                />
                <InputField
                  name="manejos.0.tipoOperacao.tipo"
                  label="Tipo"
                  placeholder="Ex: Aração"
                  className="col-md-4"
                  setValueAs={(v) => v?.toLocaleUpperCase("pt-BR")}
                  required
                />
              </div>
            </div>
          </div>
          {/* Histórico de cobertura do solo em pré-semeadura */}
          <div className="mb-4 card border-0 shadow-sm">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">
                Histórico de cobertura do solo em pré-semeadura
              </h2>
            </div>
            <div className="card-body">
              {coberturas.map((item, index) => (
                <div key={item.id} className="card mb-4 shadow-sm border-0">
                  <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                      Histórico de Cobertura (Nº {index + 1})
                    </h3>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      disabled={coberturas.length <= 1}
                      onClick={() => removeCobertura(index)}
                    >
                      Remover
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row gx-3 gy-4">
                      <InputField
                        name={`coberturas.${index}.dataAvaliacao`}
                        label="Data da avaliação"
                        className="col-md-6"
                        type="date"
                        required
                      />
                      <InputField
                        name={`coberturas.${index}.porcentualPalhada`}
                        label="Cobertura do solo (%)"
                        className="col-md-6"
                        type="number"
                        placeholder="Ex: 70"
                        required
                      />
                    </div>
                    <div className="d-flex ms-2 mb-3">
                      <HelpButton
                        label={
                          <>
                            <div>
                              <strong>C</strong> = Média da Cobertura de Solo
                            </div>
                            <div>
                              se <strong>C &lt; 30</strong> = <strong>NM1</strong>
                            </div>
                            <div>
                              se <strong>30 ≤ C &lt; 60</strong> = <strong>NM2</strong>
                            </div>
                            <div>
                              se <strong>60 ≤ C &lt; 90</strong> = <strong>NM3</strong>
                            </div>
                            <div>
                              se <strong>C ≥ 90</strong> = <strong>NM4</strong>
                            </div>
                          </>
                        }
                        values={valoresCobertura}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    appendCobertura({
                      dataAvaliacao: "",
                      porcentualPalhada: "",
                    })
                  }
                >
                  + Adicionar Histórico de Cobertura
                </button>
              </div>
            </div>
          </div>

          {/* Pai: Histórico / Próximo Cultivo */}
          <div className="card mb-4 shadow-sm border-0">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#0b4809" }}
            >
              <h2 className="mb-0">Histórico / Próximo Cultivo</h2>
            </div>
            <div className="card-body">
              {/* Histórico de Cultivos */}
              {historicos.map((item, histIndex) => {
                const origIndex = producoes.findIndex((p) => p.id === item.id);
                return (
                  <div key={item.id} className="card mb-4 shadow-sm border-0">
                    <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                      <h3 className="mb-0">
                        Histórico de Cultivos (Nº {histIndex + 1})
                      </h3>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        disabled={historicos.length <= 1}
                        onClick={() => remove(origIndex)}
                      >
                        Remover
                      </button>
                    </div>
                    <div className="card-body">
                      <div className="row gx-3 gy-3">
                        <InputField
                          className="col-md-3"
                          name={`producoes.${origIndex}.dataPlantio`}
                          label="Data Plantio"
                          type="date"
                          setValueAs={(v) => (v ? String(v) : "")}
                          required
                        />
                        <InputField
                          className="col-md-3"
                          name={`producoes.${origIndex}.dataColheita`}
                          label="Data Colheita"
                          type="date"
                          setValueAs={(v) => (v ? String(v) : "")}
                          required
                        />
                        <InputField
                          className="col-md-2"
                          name={`producoes.${origIndex}.ilp`}
                          label="Integração Lavoura Pecuária - ILP?"
                          type="select"
                          options={[
                            { value: "true", label: "Sim" },
                            { value: "false", label: "Não" },
                          ]}
                          required
                        />
                        <InputField
                          className="col-md-2"
                          name={`producoes.${origIndex}.cultura.codigo`}
                          label="Cultivo"
                          type="select"
                          options={culturaOptions.map(({ nome, codigo }) => ({
                            label: nome,
                            value: codigo,
                          }))}
                          setValueAs={(v) => String(v)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                className="btn btn-primary mb-4"
                onClick={() =>
                  append({
                    isHistorical: true,
                    dataPlantio: "",
                    dataColheita: "",
                    coberturaSolo: "",
                    ilp: "",
                    cultura: { codigo: "" },
                  })
                }
              >
                + Adicionar Histórico
              </button>

              {/* Próximo Cultivo */}
              {idxProximo >= 0 && (
                <div className="card mb-4 shadow-sm border-0">
                  <div className="card-header bg-warning text-white">
                    <h3 className="mb-0">Próximo Cultivo</h3>
                  </div>
                  <div className="card-body">
                    <div className="row gx-3 gy-3">
                      <InputField
                        className="col-md-3"
                        name={`producoes.${idxProximo}.dataPrevisaoPlantio`}
                        label="Data previsão plantio"
                        type="date"
                        setValueAs={(v) => (v ? String(v) : "")}
                        required
                      />
                      <InputField
                        className="col-md-3"
                        name={`producoes.${idxProximo}.dataPrevisaoColheita`}
                        label="Data previsão colheita"
                        type="date"
                        setValueAs={(v) => (v ? String(v) : "")}
                        required
                      />
                      <InputField
                        className="col-md-2"
                        name={`producoes.${idxProximo}.ilp`}
                        label="Integração Lavoura Pecuária - ILP?"
                        type="select"
                        options={[
                          { value: "true", label: "Sim" },
                          { value: "false", label: "Não" },
                        ]}
                        required
                      />
                      <InputField
                        className="col-md-4"
                        name={`producoes.${idxProximo}.cultura.codigo`}
                        label="Cultivo"
                        type="select"
                        options={culturaOptions.map(({ nome, codigo }) => ({
                          label: nome,
                          value: codigo,
                        }))}
                        setValueAs={(v) => String(v)}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
