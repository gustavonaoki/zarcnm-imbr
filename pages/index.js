import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import FormPage from "../components/form1";
import Form2 from "../components/form2";
import Form3 from "../components/form3";
import NM1 from "../data/NM1a.json";
import NM2 from "../data/NM2a.json";
import NM3 from "../data/NM3a.json";
import NM4 from "../data/NM4a.json";
import styles from "../styles/GeneralForms.module.css";
import { useFormsApi } from "../hooks/useFormApi";
import { formatErrors } from "../utils/formatErrors";

export default function GeneralForms() {
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState([]);
  const [form3Data, setForm3Data] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");
  const [scoreData, setScoreData] = useState(null);

  const { submitForms, results, chaveNM, resetResults } = useFormsApi();

  const [openDropdowns, setOpenDropdowns] = useState({
    form1: false,
    form2: false,
    form3: false,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const opcoesJson = {
    NM1,
    NM2,
    NM3,
    NM4,
  };

  const handleAutoPreencher = () => {
    const jsonSelecionado = opcoesJson[opcaoSelecionada];
    if (!jsonSelecionado) {
      alert("Por favor, selecione um JSON válido.");
      return;
    }

    try {
      resetResults();
      setScoreData(null);

      const dadosGlebaTalhao =
        jsonSelecionado.item[0]?.item[0]?.request?.body?.raw || [];
      const dadosLaboratorio =
        jsonSelecionado.item[1]?.item[0]?.request?.body?.raw || [];
      const dadosSensoriamento =
        jsonSelecionado.item[2]?.item[0]?.request?.body?.raw || [];

      const cpf = dadosGlebaTalhao?.produtor?.cpf?.replace(/\D/g, "") || "";
      const cnpj =
        dadosGlebaTalhao?.propriedade?.cnpj?.replace(/\D/g, "") || "";

      setForm1Data({ ...dadosGlebaTalhao });
      setForm2Data({
        ...dadosLaboratorio,
        cpfProdutor: cpf,
        cnpj: cnpj,
      });
      setForm3Data({
        ...dadosSensoriamento,
        cpfProdutor: cpf,
        cnpj: cnpj,
      });

      alert("Dados preenchidos com sucesso!");
    } catch (error) {
      alert("Erro ao acessar os dados no JSON selecionado.");
    }
  };

  const handleSubmit = async () => {
    try {
      await submitForms(form1Data, form2Data, form3Data);
    } catch (err) {}
  };

  const handleObterScore = async () => {
    try {
      const response = await fetch(`/api/getScore?chave=${chaveNM}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Erro ao obter score");
      }

      setScoreData(data);
    } catch (error) {
      console.error("❌ Erro ao obter score:", error);
      alert(error.message);
    }
  };

  const todosComSucesso =
    results.form1?.success && results.form2?.success && results.form3?.success;

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column align-items-center bg-light">
      <div className="w-100 p-3 d-flex justify-content-end align-items-center bg-light shadow">
        <label className="form-label fs-4 mb-0 me-3">Selecione o JSON:</label>
        <select
          className="form-select w-auto"
          style={{ minWidth: "200px" }}
          value={opcaoSelecionada}
          onChange={(e) => setOpcaoSelecionada(e.target.value)}
        >
          <option value="">Selecione</option>
          {Object.keys(opcoesJson).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <button
          className="btn btn-primary ms-3"
          onClick={handleAutoPreencher}
          disabled={!opcaoSelecionada}
        >
          Autopreencher
        </button>
      </div>

      <div className="mt-5"></div>

      {/* Dropdowns dos Formulários */}
      <div className="d-flex flex-column gap-3 w-50">
        {/* Form1 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            show={openDropdowns.form1}
            onToggle={() => toggleDropdown("form1")}
          >
            <Dropdown.Toggle variant="success" className="btn-lg w-100">
              Operador de Contratos
            </Dropdown.Toggle>
            {openDropdowns.form1 && (
              <div className={styles.dropdownExpand}>
                <FormPage onChange={setForm1Data} initialData={form1Data} />
              </div>
            )}
          </Dropdown>
        </div>

        {/* Form2 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            show={openDropdowns.form2}
            onToggle={() => toggleDropdown("form2")}
          >
            <Dropdown.Toggle variant="success" className="btn-lg w-100">
              Operador de Análise de Solo
            </Dropdown.Toggle>
            {openDropdowns.form2 && (
              <div className={styles.dropdownExpand}>
                <Form2
                  onChange={(form2) => {
                    setForm2Data((prev) => ({
                      ...form2,
                      cpfProdutor:
                        prev?.cpfProdutor || form2?.cpfProdutor || "",
                      cnpj: prev?.cnpj || form2?.cnpj || "",
                    }));
                  }}
                  initialData={form2Data}
                />
              </div>
            )}
          </Dropdown>
        </div>

        {/* Form3 */}
        <div className={styles.dropdownContainer}>
          <Dropdown
            show={openDropdowns.form3}
            onToggle={() => toggleDropdown("form3")}
          >
            <Dropdown.Toggle variant="success" className="btn-lg w-100">
              Operador de Sensoriamento Remoto
            </Dropdown.Toggle>
            {openDropdowns.form3 && (
              <div className={styles.dropdownExpand}>
                <Form3
                  onChange={(form3) => setForm3Data(form3)}
                  initialData={[
                    {
                      ...form3Data,
                      cpfProdutor:
                        form1Data?.produtor?.cpf?.replace(/\D/g, "") || "",
                      cnpj:
                        form1Data?.propriedade?.cnpj?.replace(/\D/g, "") || "",
                    },
                  ]}
                />
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="mt-4 text-center d-flex flex-column gap-3">
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
          disabled={
            !form1Data ||
            typeof form1Data !== "object" ||
            Object.keys(form1Data).length === 0
          }
        >
          Enviar
        </button>
      </div>

      {/* Resultado das Requisições */}
      {(results.form1 || results.form2 || results.form3) && (
        <div className="card mt-4 shadow-sm" style={{ maxWidth: "600px" }}>
          <div className="card-header bg-dark text-white">
            <strong>Resultados dos envios</strong>
          </div>
          <div className="card-body">
            {["form1", "form2", "form3"].map((key, idx) => {
              const res = results[key];
              const nomesFormularios = {
                form1: "Cadastro da Gleba",
                form2: "Análise de Solo",
                form3: "Sensoriamento Remoto",
              };

              return (
                <div key={idx} className="mb-3">
                  <h5>
                    {nomesFormularios[key]}:{" "}
                    {res?.success ? (
                      <span className="text-success">✅ Sucesso</span>
                    ) : res?.error ? (
                      <span className="text-danger">❌ Erro</span>
                    ) : (
                      <span className="text-muted">⏳ Aguardando...</span>
                    )}
                  </h5>
                  {res?.error && (
                    <div
                      className="alert alert-danger mt-2 d-flex align-items-start"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill me-2 mt-1"></i>
                      <span className="mb-0" style={{ whiteSpace: "pre-wrap" }}>
                        {formatErrors(res.error)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {todosComSucesso && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={handleObterScore}
                >
                  Obter Score
                </button>
              </div>
            )}

            {scoreData && (
              <div className="mt-4">
                <h5>
                  🎯 Score Final:{" "}
                  <strong className="text-success">
                    {scoreData.scoreFinal}
                  </strong>
                </h5>
                <p className="mt-1">
                  <small>Chave Classificação NM:</small>
                  <br />
                  <code>{scoreData.chaveClassificacaoNM}</code>
                </p>
                <p>
                  <strong>Data do Cálculo:</strong>{" "}
                  {new Date(scoreData.dataCalculo).toLocaleString()}
                </p>
                <hr />
                <h6>⚠️ Inconsistências encontradas:</h6>
                {scoreData.inconsistencias?.length > 0 ? (
                  <ul className="list-group">
                    {scoreData.inconsistencias.map((item, i) => (
                      <li key={i} className="list-group-item">
                        <strong>{item.tipo}:</strong> {item.descricao}
                        <br />
                        <small className="text-muted">
                          Registrado em:{" "}
                          {new Date(item.dataRegistro).toLocaleDateString()}
                        </small>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-success">
                    Nenhuma inconsistência encontrada.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
