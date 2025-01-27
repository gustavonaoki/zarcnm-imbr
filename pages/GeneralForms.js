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
import { createToken } from "./api/models/createToken";
import { generateAuthToken } from "./api/auth/generateAuthToken";



export default function GeneralForms() {
  const [form1Data, setForm1Data] = useState(null);
  const [form2Data, setForm2Data] = useState([]);
  const [form3Data, setForm3Data] = useState([]);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(""); // Opção do JSON selecionado

  const opcoesJson = {
    NM1a: NM1a,
    NM1b: NM1b,
    NM2a: NM2a,
    NM2b: NM2b,
    NM3a: NM3a,
    NM3b: NM3b,
    NM4a: NM4a,
    NM4b: NM4b,
  };

  // Função para autopreencher
  const handleAutoPreencher = () => {
    const jsonSelecionado = opcoesJson[opcaoSelecionada];
    if (!jsonSelecionado) {
      alert("Por favor, selecione um JSON válido.");
      return;
    }

    try {
      // Extraindo dados dos formulários do JSON
      const dadosGlebaTalhao =
        jsonSelecionado.item[0]?.item[0]?.request?.body?.raw || [];
      const dadosLaboratorio =
        jsonSelecionado.item[1]?.item[0]?.request?.body?.raw || [];
      const dadosSensoriamento =
        jsonSelecionado.item[2]?.item[0]?.request?.body?.raw || [];

      // Atualizando estados dos formulários
      setForm1Data(dadosGlebaTalhao);
      setForm2Data(dadosLaboratorio);
      setForm3Data(dadosSensoriamento);

      alert("Dados preenchidos com sucesso!");
    } catch (error) {
      console.error("Erro ao acessar os dados do JSON:", error);
      alert("Erro ao acessar os dados no JSON selecionado.");
    }
  };

  // Função para envio dos dados
  const handleSubmit = async () => {
    try {
      //console.log("Enviando dados dos formulários...");

      const createdToken = await createToken(form1Data) 
      console.log(createdToken);
      
      
      //console.log("Dados do Form1 (Gleba/Talhão):", form1Data);
      //console.log("Dados do Form2 (Laboratório):", form2Data);
      //console.log("Dados do Form3 (Sensoriamento):", form3Data);

      // Adicione a lógica para envio de dados para os endpoints
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar os dados.");
    }
  };

  return (
    <div>
      {/* Select para selecionar JSON */}
      <div className="mb-4 text-center w-100">
        <label className="form-label fs-4">Selecione o JSON:</label>
        <select
          className="form-select w-auto mx-auto"
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
          className="btn btn-primary btn-lg mt-3"
          onClick={handleAutoPreencher}
          disabled={!opcaoSelecionada}
        >
          Autopreencher Todos os Formulários
        </button>
      </div>

      {/* Renderizar os formulários */}
      <div  className="d-flex flex-column gap-3 w-100">
      <Dropdown className="w-100" autoClose={false}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-lg w-100">
          Form1
        </Dropdown.Toggle>
        <Dropdown.Menu className="w-100 position-relative" style={{ padding: "10px", maxWidth: "1000px", margin: "auto auto 100px auto" }}>
          <div>
            <FormPage
              onSubmit={(data) => setForm1Data(data)}
              initialData={form1Data}
            />
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="w-100"  autoClose={false}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-lg w-100">
          Form2
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="w-100 position-relative"
          style={{ padding: "10px", maxWidth: "1000px", margin: "auto auto 100px auto" }}
        >
          <div>
            <Form2
              onSubmit={(data) => setForm2Data(data)}
              initialData={form2Data}
            />
          </div>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown className="w-100"  autoClose={false}>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-lg w-100">
          Form3
        </Dropdown.Toggle>
        <Dropdown.Menu
          className="w-100 position-relative"
          style={{ padding: "10px", maxWidth: "1000px",margin: "auto auto 100px auto" }}
        >
          <div>
            <Form3
              onSubmit={(data) => setForm3Data(data)}
              initialData={form3Data}
            />
          </div>
        </Dropdown.Menu>
      </Dropdown>


      </div>
      


      {/* Botão de envio */}
      <div className="d-flex justify-content-between mt-3">
        <button
          type="button"
          className="btn btn-success btn-lg mt-3"
          onClick={handleSubmit}
          disabled={!form1Data || form2Data.length === 0 || form3Data.length === 0}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
