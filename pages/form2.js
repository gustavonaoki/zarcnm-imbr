import { useState } from "react";

const Form2 = () => {
  const [analisesSolo, setAnalisesSolo] = useState([
    {
      cpfResponsavelColeta: "12345678900",
      dataColeta: "2024-04-17",
      pontoColeta: "POINT(40.71727401 -74.00898606)",
      camada: "20",
      areia: 0,
      silte: 0,
      argila: 0,
      calcio: 0,
      magnesio: 0,
      potassio: 0,
      sodio: 0,
      aluminio: 0,
      acidezPotencial: 0,
      phh2o: 0,
      fosforoMehlich: 0,
      enxofre: 0,
      mos: 0,
    },
  ]);

  // Função para manipular alterações nos inputs
  const handleChange = (e, index, field) => {
    const { value } = e.target;
    setAnalisesSolo((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Função para adicionar uma nova análise de solo
  const addAnalise = () => {
    setAnalisesSolo((prev) => [
      ...prev,
      {
        cpfResponsavelColeta: "",
        dataColeta: "",
        pontoColeta: "",
        camada: "",
        areia: 0,
        silte: 0,
        argila: 0,
        calcio: 0,
        magnesio: 0,
        potassio: 0,
        sodio: 0,
        aluminio: 0,
        acidezPotencial: 0,
        phh2o: 0,
        fosforoMehlich: 0,
        enxofre: 0,
        mos: 0,
      },
    ]);
  };

  // Função para envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/endpoint2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(analisesSolo),
      });

      if (response.ok) {
        alert("Análises enviadas com sucesso!");
      } else {
        alert("Erro ao enviar análises.");
      }
    } catch (error) {
      console.error("Erro ao enviar análises:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Formulário 2: Análises de Solo</h2>
      <form onSubmit={handleSubmit}>
        {analisesSolo.map((analise, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>Análise {index + 1}</h3>
            <label>
              CPF do Responsável:
              <input
                type="text"
                value={analise.cpfResponsavelColeta}
                onChange={(e) => handleChange(e, index, "cpfResponsavelColeta")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Data da Coleta:
              <input
                type="date"
                value={analise.dataColeta}
                onChange={(e) => handleChange(e, index, "dataColeta")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Ponto de Coleta:
              <textarea
                value={analise.pontoColeta}
                onChange={(e) => handleChange(e, index, "pontoColeta")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              ></textarea>
            </label>
            <label>
              Camada:
              <input
                type="text"
                value={analise.camada}
                onChange={(e) => handleChange(e, index, "camada")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <h4>Informações Físicas</h4>
            <label>
              Areia (%):
              <input
                type="number"
                value={analise.areia}
                onChange={(e) => handleChange(e, index, "areia")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Silte (%):
              <input
                type="number"
                value={analise.silte}
                onChange={(e) => handleChange(e, index, "silte")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Argila (%):
              <input
                type="number"
                value={analise.argila}
                onChange={(e) => handleChange(e, index, "argila")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <h4>Informações Químicas</h4>
            <label>
              Cálcio (cmolc/kg):
              <input
                type="number"
                value={analise.calcio}
                onChange={(e) => handleChange(e, index, "calcio")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            <label>
              Magnésio (cmolc/kg):
              <input
                type="number"
                value={analise.magnesio}
                onChange={(e) => handleChange(e, index, "magnesio")}
                style={{
                  width: "100%",
                  margin: "5px 0",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </label>
            {/* Adicione outros campos químicos aqui */}
          </div>
        ))}
        <button
          type="button"
          onClick={addAnalise}
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Adicionar Nova Análise
        </button>
        <button
          type="submit"
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form2;
