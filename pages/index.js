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
import ScoreResultsCard from "../components/resultsCard";

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

      setForm1Data(dadosGlebaTalhao);
      setForm2Data(dadosLaboratorio);
      setForm3Data(dadosSensoriamento);

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
                <Form2 onChange={setForm2Data} initialData={form2Data} />
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
                <Form3 onChange={setForm3Data} initialData={[form3Data]} />
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
        <ScoreResultsCard
          results={results}
          todosComSucesso={todosComSucesso}
          scoreData={scoreData}
          handleObterScore={handleObterScore}
        />
      )}
    </div>
  );
}
