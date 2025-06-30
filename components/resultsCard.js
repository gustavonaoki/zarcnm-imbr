import { formatErrors } from "../utils/formatErrors";

export default function ScoreResultsCard({ results, todosComSucesso, scoreData, handleObterScore }) {
  const nomesFormularios = {
    form1: "Cadastro da Gleba",
    form2: "Análise de Solo",
    form3: "Sensoriamento Remoto",
  };

  return (
    <div className="card mt-4 shadow-sm" style={{ maxWidth: "600px" }}>
      <div className="card-header bg-dark text-white">
        <strong>Resultados dos envios</strong>
      </div>
      <div className="card-body">
        {["form1", "form2", "form3"].map((key, idx) => {
          const res = results[key];

          return (
            <div key={idx} className="mb-3">
              <h5>
                {nomesFormularios[key]}:{" "}
                {res?.success ? (
                  <span className="text-success">✅ Sucesso
                  </span>
                ) : res?.error ? (
                  <span className="text-danger">❌ Erro
                  </span>
                ) : (
                  <span className="text-muted">⏳ Aguardando...
                  </span>
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
            <button className="btn btn-secondary" onClick={handleObterScore}>
              Obter Score
            </button>
          </div>
        )}

        {scoreData && (
          <div className="mt-4">
            <h5>
              Score Final:{" "}
              <strong className="text-success">{scoreData.scoreFinal}</strong>
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
                      Registrado em: {new Date(item.dataRegistro).toLocaleDateString()}
                    </small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-success">Nenhuma inconsistência encontrada.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
