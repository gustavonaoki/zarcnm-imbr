import { useState } from "react";

const Form3 = () => {
  const [formData, setFormData] = useState({
    dataInicial: "2021-01-17",
    dataFinal: "2024-05-14",
    declividadeMedia: 60,
    plantioContorno: 0,
    terraceamento: 0,
    indices: [
      {
        satelite: "Sentinel",
        coordenada: "POINT(40.71727401 -74.00898606)",
        data: "2022-08-29",
        ndvi: 0.3342,
        ndti: 0.1342,
      },
    ],
    interpretacoesCultura: [
      {
        cultura: "Soja (grão)",
        dataInicio: "2023-10-01",
        dataFim: "2024-02-01",
        coberturaSolo: 40,
      },
    ],
    interpretacoesManejo: [
      {
        data: "2021-01-28",
        operacao: "Revolvimento do solo",
        tipoOperacao: "Aração",
      },
    ],
  });

  // Manipular alterações nos campos de texto
  const handleChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Manipular alterações em arrays (indices, interpretacoesCultura, interpretacoesManejo)
  const handleArrayChange = (e, index, arrayField, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedArray = [...prev[arrayField]];
      updatedArray[index][field] = value;
      return { ...prev, [arrayField]: updatedArray };
    });
  };

  // Adicionar novas entradas para arrays
  const addEntry = (arrayField, defaultValues) => {
    setFormData((prev) => ({
      ...prev,
      [arrayField]: [...prev[arrayField], defaultValues],
    }));
  };

  // Submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/v1/endpoint3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Dados enviados com sucesso!");
      } else {
        alert("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Formulário 3: Dados de Monitoramento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Data Inicial:
          <input
            type="date"
            value={formData.dataInicial}
            onChange={(e) => handleChange(e, "dataInicial")}
            style={{ margin: "5px 0", padding: "8px", width: "100%" }}
          />
        </label>
        <label>
          Data Final:
          <input
            type="date"
            value={formData.dataFinal}
            onChange={(e) => handleChange(e, "dataFinal")}
            style={{ margin: "5px 0", padding: "8px", width: "100%" }}
          />
        </label>
        <label>
          Declividade Média:
          <input
            type="number"
            value={formData.declividadeMedia}
            onChange={(e) => handleChange(e, "declividadeMedia")}
            style={{ margin: "5px 0", padding: "8px", width: "100%" }}
          />
        </label>
        <label>
          Plantio Contorno:
          <input
            type="number"
            value={formData.plantioContorno}
            onChange={(e) => handleChange(e, "plantioContorno")}
            style={{ margin: "5px 0", padding: "8px", width: "100%" }}
          />
        </label>
        <label>
          Terraceamento:
          <input
            type="number"
            value={formData.terraceamento}
            onChange={(e) => handleChange(e, "terraceamento")}
            style={{ margin: "5px 0", padding: "8px", width: "100%" }}
          />
        </label>

        {/* Indices */}
        <h3>Índices de Monitoramento</h3>
        {formData.indices.map((indice, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <label>
              Satélite:
              <input
                type="text"
                value={indice.satelite}
                onChange={(e) =>
                  handleArrayChange(e, index, "indices", "satelite")
                }
              />
            </label>
            <label>
              Coordenada:
              <input
                type="text"
                value={indice.coordenada}
                onChange={(e) =>
                  handleArrayChange(e, index, "indices", "coordenada")
                }
              />
            </label>
            <label>
              Data:
              <input
                type="date"
                value={indice.data}
                onChange={(e) => handleArrayChange(e, index, "indices", "data")}
              />
            </label>
            <label>
              NDVI:
              <input
                type="number"
                value={indice.ndvi}
                onChange={(e) => handleArrayChange(e, index, "indices", "ndvi")}
              />
            </label>
            <label>
              NDTI:
              <input
                type="number"
                value={indice.ndti}
                onChange={(e) => handleArrayChange(e, index, "indices", "ndti")}
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addEntry("indices", {
              satelite: "",
              coordenada: "",
              data: "",
              ndvi: 0,
              ndti: 0,
            })
          }
        >
          Adicionar Índice
        </button>

        {/* Interpretações de Cultura */}
        <h3>Interpretações de Cultura</h3>
        {formData.interpretacoesCultura.map((cultura, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <label>
              Cultura:
              <input
                type="text"
                value={cultura.cultura}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesCultura",
                    "cultura"
                  )
                }
              />
            </label>
            <label>
              Data Início:
              <input
                type="date"
                value={cultura.dataInicio}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesCultura",
                    "dataInicio"
                  )
                }
              />
            </label>
            <label>
              Data Fim:
              <input
                type="date"
                value={cultura.dataFim}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesCultura",
                    "dataFim"
                  )
                }
              />
            </label>
            <label>
              Cobertura Solo:
              <input
                type="number"
                value={cultura.coberturaSolo}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesCultura",
                    "coberturaSolo"
                  )
                }
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addEntry("interpretacoesCultura", {
              cultura: "",
              dataInicio: "",
              dataFim: "",
              coberturaSolo: 0,
            })
          }
        >
          Adicionar Cultura
        </button>

        {/* Interpretações de Manejo */}
        <h3>Interpretações de Manejo</h3>
        {formData.interpretacoesManejo.map((manejo, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <label>
              Data:
              <input
                type="date"
                value={manejo.data}
                onChange={(e) =>
                  handleArrayChange(e, index, "interpretacoesManejo", "data")
                }
              />
            </label>
            <label>
              Operação:
              <input
                type="text"
                value={manejo.operacao}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesManejo",
                    "operacao"
                  )
                }
              />
            </label>
            <label>
              Tipo de Operação:
              <input
                type="text"
                value={manejo.tipoOperacao}
                onChange={(e) =>
                  handleArrayChange(
                    e,
                    index,
                    "interpretacoesManejo",
                    "tipoOperacao"
                  )
                }
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addEntry("interpretacoesManejo", {
              data: "",
              operacao: "",
              tipoOperacao: "",
            })
          }
        >
          Adicionar Manejo
        </button>

        <button type="submit" style={{ marginTop: "10px" }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form3;
