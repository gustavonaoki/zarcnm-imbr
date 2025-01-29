import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import FormPage from "../components/form1leo";
import Form2 from "../components/form2leo";
import Form3 from "../components/form3";
import NM1a from "../data/NM1a.json";
import NM1b from "../data/NM1b.json";
import NM2a from "../data/NM2a.json";
import NM2b from "../data/NM2b.json";
import NM3a from "../data/NM3a.json";
import NM3b from "../data/NM3b.json";
import NM4a from "../data/NM4a.json";
import NM4b from "../data/NM4b.json";
import styles from "../styles/GeneralForms.module.css";

export default function GeneralForms() {
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState([]);
  const [form3Data, setForm3Data] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState("");

  // Estado para controlar múltiplos dropdowns abertos
  const [openDropdowns, setOpenDropdowns] = useState({
    form1: false,
    form2: false,
    form3: false,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown], // Alterna apenas o dropdown clicado
    }));
  };

  const opcoesJson = { NM1a, NM1b, NM2a, NM2b, NM3a, NM3b, NM4a, NM4b };

  const handleAutoPreencher = () => {
    const jsonSelecionado = opcoesJson[opcaoSelecionada];
    if (!jsonSelecionado) {
      alert("Por favor, selecione um JSON válido.");
      return;
    }

    try {
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
      console.error("Erro ao acessar os dados do JSON:", error);
      alert("Erro ao acessar os dados no JSON selecionado.");
    }
  };

  const handleSubmit = async () => {
    try {
      console.log("Enviando dados dos formulários...");
      console.log("Dados do Form1:", form1Data);
      console.log("Dados do Form2:", form2Data);
      console.log("Dados do Form3:", form3Data);

      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar os dados.");
    }
  };

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

      {/* Espaçamento entre o seletor e os formulários */}
      <div className="mt-5"></div>

      {/* Formulários organizados corretamente */}
      <div className="d-flex flex-column gap-3 w-50">
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
                <FormPage onSubmit={setForm1Data} initialData={form1Data} />
              </div>
            )}
          </Dropdown>
        </div>

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
                <Form2 onSubmit={setForm2Data} initialData={form2Data} />
              </div>
            )}
          </Dropdown>
        </div>

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
                <Form3 onSubmit={setForm3Data} initialData={form3Data} />
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      {/* Container para o botão de enviar garantir que ele fique sempre no final */}
      <div className="mt-4 w-50 text-center">
        <button
          type="button"
          className="btn btn-success "
          onClick={handleSubmit}
          disabled={
            !form1Data || form2Data.length === 0 || form3Data.length === 0
          }
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
