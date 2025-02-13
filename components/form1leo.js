import { useState, useEffect, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from "react-input-mask";
import { culturaOptions } from "../optionsInputs/culturas";
import { modeloCadastroGleba } from "../modelos/modeloCadastroGleba";
import { errorsValidate } from "../errors/errorsValidators";
import { errorsValidateArray } from "../errors/errorsvalidatorsArray";

export default function Form1({ initialData, onSubmit }) {
    // Inicializa o estado corretamente sem `useEffect` dentro
    const [cadastroGleba, setCadastroGleba] = useState(() => {
        const modelo = modeloCadastroGleba();

        // Se não houver "Próxima Cultura", adicionamos automaticamente
        if (!modelo.producoes.some(p => !p.isHistorical)) {
            modelo.producoes.push({
                dataPrevisaoPlantio: "",
                dataPrevisaoColheita: "",
                ilp: "",
                cultura: { nome: "" },
                isHistorical: false, // Próxima Cultura sempre presente
            });
        }

        return modelo;
    });

    const [errors, setErrors] = useState({});

    // 🔹 Atualiza o estado quando `initialData` mudar
    useEffect(() => {
        if (initialData) {
            setCadastroGleba((prevData) => ({
                ...prevData,
                ...initialData,
            }));
        }
    }, [initialData]);

    // 🔹 Atualiza os campos do formulário
    const handleChange = (e, fieldPath) => {
        const { value } = e.target;

        setCadastroGleba((prev) => {
            const keys = fieldPath.split(".");
            const updatedData = { ...prev };
            let current = updatedData;

            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = { ...current[key] };
                current = current[key];
            }

            current[keys[keys.length - 1]] = value;
            return updatedData;
        });

        // Valida erros
        errorsValidate(e, fieldPath, setErrors);
    };

    // 🔹 Atualiza os campos dentro dos arrays (Histórico de Culturas)
    const handleArrayChange = (e, index, arrayField, fieldPath) => {
        const { value } = e.target;

        setCadastroGleba((prev) => {
            // Clona o array de produções para evitar mutação direta no estado
            const updatedArray = [...prev[arrayField]];

            if (updatedArray[index]) {
                const keys = fieldPath.split("."); // Divide a string em chaves
                let current = updatedArray[index]; // Obtém o objeto correspondente

                // Percorre todas as chaves exceto a última
                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    current[key] = { ...current[key] }; // Garante que não mutamos o estado diretamente
                    current = current[key];
                }

                // Atualiza o valor do campo final
                current[keys[keys.length - 1]] = value;
            }

            return { ...prev, [arrayField]: updatedArray };
        });

        // Valida erros
        console.log(errors);

        errorsValidateArray(e, index, arrayField, fieldPath, setErrors);
    };

    // Adiciona um novo histórico de cultura
    const handleAddEntry = (option) => {

        if (option === "manejos") {
            setCadastroGleba((prev) => ({
                ...prev,
                manejos: [
                    ...prev.manejos,
                    {
                        "data": "",
                        "operacao": {
                            "nomeOperacao": ""
                        },
                        "tipoOperacao": {
                            "tipo": ""
                        }

                    }
                ]
            }));

        }
        if (option === "historico") {
            setCadastroGleba((prev) => ({
                ...prev,
                producoes: [
                    ...prev.producoes,
                    {
                        "dataPlantio": "",
                        "dataColheita": "",
                        "coberturaSolo": 0,
                        "ilp": "",
                        "cultura": { "nome": "" },
                        "isHistorical": true, // Sempre um histórico de cultura
                    },
                ],
            }));
        }

    };

    const producoesOrdenadas = () => {
        return cadastroGleba.producoes.sort((a, b) => Number(b.isHistorical) - Number(a.isHistorical));
    }

    const handleRemoveEntry = (arrayField, index) => {
        setCadastroGleba((prev) => ({
            ...prev,
            [arrayField]: prev[arrayField].filter((_, i) => i !== index), // Remove o elemento pelo índice
        }));
    };

    // Função para enviar os dados do formulário
    const handleSubmit = async (e) => {
    };

    return (
        <div className="container my-4">
            <h1 className="text-center">Formulário de Cadastro</h1>
            <h6 className="text-danger text-center">
                Todos os campos com ( * ) são obrigatórios
            </h6>
            <form onSubmit={handleSubmit}>
                {/* Dados do Produtor */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0">Dados do Produtor</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label">Nome:</label>
                                <input
                                    type="text"
                                    name="nome"
                                    className="form-control"
                                    value={cadastroGleba.produtor?.nome || ""} //Exibe o valor do campo nome do produtor
                                    onChange={(e) => handleChange(e, "produtor.nome")}
                                />
                                {errors[0]?.validateName && (
                                    <div className="text-danger mt-2">{errors[0].validateName}</div>
                                )
                                }
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF:</label>
                                <InputMask
                                    mask={"999.999.999-99"}
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    value={cadastroGleba.produtor?.cpf || ""}
                                    onChange={(e) => handleChange(e, "produtor.cpf")}
                                />

                            </div>
                        </div>
                    </div>
                </div>

                {/* Dados da Propriedade */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0">Dados da Propriedade</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Nome da propriedade:</label>
                            <input
                                type="text"
                                name="nome"
                                className="form-control"
                                value={cadastroGleba.propriedade?.nome || ""}
                                onChange={(e) => handleChange(e, "propriedade.nome")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Código CAR (Cadastro Ambiental Rural)*:
                            </label>
                            <input
                                type="text"
                                name="codigoCar"
                                className="form-control"
                                value={cadastroGleba.propriedade?.codigoCar || ""}
                                onChange={(e) => handleChange(e, "propriedade.codigoCar")}
                            />
                            {errors[0]?.validateCarCode && (
                                <div className="text-danger mt-2">{errors[0].validateCarCode}</div>
                            )
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Código IBGE:</label>
                            <input
                                type="text"
                                name="codigoIbge"
                                className="form-control"
                                value={cadastroGleba.propriedade?.codigoIbge || ""}
                                onChange={(e) => handleChange(e, "propriedade.codigoIbge")}
                            />
                            {errors[0]?.validateIBGE && (
                                <div className="text-danger mt-2">{errors[0].validateIBGE}</div>
                            )
                            }
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Polígono (Formato WKT):</label>
                            <textarea
                                name="poligono"
                                className="form-control"
                                value={cadastroGleba.propriedade?.poligono || ""}
                                onChange={(e) => handleChange(e, "propriedade.poligono")}
                            ></textarea>
                            {errors[0]?.validateWKTPolygon && (
                                <div className="text-danger mt-2">{errors[0].validateWKTPolygon}</div>
                            )
                            }
                        </div>

                    </div>
                </div>

                {/* Dados da Gleba/Talhão */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0"> Dados da Gleba/Talhão</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Polígono (Formato WKT)*:</label>
                            <textarea
                                name="poligono"

                                className="form-control"
                                value={cadastroGleba.talhao?.poligono || ""}
                                onChange={(e) => handleChange(e, "talhao.poligono")}
                            ></textarea>
                            {errors[0]?.validateWKTPolygonTalhao && (
                                <div className="text-danger mt-2">{errors[0].validateWKTPolygonTalhao}</div>
                            )
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Área (Em hectares)*:
                            </label>
                            <input
                                type="number"
                                name="area"
                                min={0}
                                className="form-control"
                                value={cadastroGleba.talhao?.area || ""}
                                onChange={(e) => handleChange(e, "talhao.area")}
                            />
                            {errors[0]?.validateArea && (
                                <div className="text-danger mt-2">{errors[0].validateArea}</div>
                            )
                            }
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo do produtor (Proprietário ou Arrendatário)*: </label>
                            <select
                                name="tipoProdutor"
                                value={cadastroGleba.talhao?.tipoProdutor || ""}
                                className="form-select"
                                onChange={(e) => handleChange(e, "talhao.tipoProdutor")}
                            >
                                <option value="Proprietário">Proprietário</option>
                                <option value="Arrendatário">Arrendatário</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Operações mecanizadas realizadas na gleba: */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0"> Operações mecanizadas realizadas na gleba:</h2>
                    </div>
                    <div className="card-body">
                        {cadastroGleba.manejos.map((manejo, index) => (
                            <div key={index} className="mb-3 ">
                                <label className="form-label">Data da operação*: </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dataOperacao"
                                    value={manejo?.data || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "data")}
                                />
                                {errors[index]?.validateDate && (
                                    <div className="text-danger mt-2">{errors[index].validateDate}</div>
                                )
                                }
                                <label className="form-label">Nome da Operação*: </label>
                                <input
                                    type="text"
                                    name="nomeOperacao"
                                    className="form-control"
                                    required
                                    value={manejo.operacao?.nomeOperacao || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "operacao.nomeOperacao")}
                                />
                                {errors[index]?.validateOperationName && (
                                    <div className="text-danger mt-2">{errors[index].validateOperationName}</div>
                                )
                                }
                                <label className="form-label">Tipo da Operação*: </label>
                                <input
                                    type="text"
                                    required
                                    name="tipoOperacao"
                                    className="form-control"
                                    value={manejo.tipoOperacao?.tipo || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "tipoOperacao.tipo")}
                                />
                                {errors[index]?.validateOperationType && (
                                    <div className="text-danger mt-2">{errors[index].validateOperationType}</div>
                                )
                                }
                            </div>

                        ))}
                    </div>
                </div>

                {/* Histórico de culturas na gleba/talhão */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0">Histórico/Próxima cultura:</h2>
                    </div>
                    <div className="card-body">
                        {/* 🔹 Renderiza as culturas ordenadas corretamente */}
                        {producoesOrdenadas().map((producao, index) => (
                            <div key={index}
                                className="mb-4 p-3 border rounded"
                                style={{ borderLeft: `5px solid ${producao.isHistorical ? "#006400" : "#228B22"}` }}
                            >
                                <div
                                    className="card-header d-flex justify-content-between align-items-center"
                                    style={{ backgroundColor: producao.isHistorical ? "#006400" : "#0d6efd", color: "white" }}
                                >
                                    <h5 className="mb-0">
                                        {producao.isHistorical ? `Histórico de cultura ${index + 1}` : "Próxima cultura"}
                                    </h5>
                                    {/* Botão "Remover" apenas para histórico de culturas */}
                                    {producao.isHistorical && cadastroGleba.producoes.filter(p => p.isHistorical).length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveEntry("producoes", index)}
                                        >
                                            <i className="bi bi-trash-fill"></i> Remover
                                        </button>
                                    )}
                                </div>

                                {/* Campos do Histórico de Cultura */}
                                {producao.isHistorical ? (
                                    <>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Data do plantio*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataPlantio || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataPlantio")}

                                                />
                                                {errors[index]?.validateDatePlanting && (
                                                    <div className="text-danger mt-2">{errors[index].validateDatePlanting}</div>
                                                )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Data previsão da colheita*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataColheita || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataColheita")}
                                                />
                                                {errors[index]?.validateDateHarvest && (
                                                    <div className="text-danger mt-2">{errors[index].validateDateHarvest}</div>
                                                )
                                                }
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Cobertura do solo (%)*:</label>
                                                <input type="number" min={0} max={100} className="form-control"
                                                    value={producao?.coberturaSolo || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "coberturaSolo")}

                                                />
                                                {errors[index]?.validateGroundCover && (
                                                    <div className="text-danger mt-2">{errors[index].validateGroundCover}</div>
                                                )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Integração Lavoura Pecuária - ILP*:</label>
                                                <select className="form-select"
                                                    value={producao?.ilp || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "ilp")}
                                                    required
                                                >
                                                    <option value="true">SIM</option>
                                                    <option value="false">NÃO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // Campos da Próxima Cultura
                                    <>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Data previsão do plantio*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataPrevisaoPlantio || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataPrevisaoPlantio")}
                                                    required
                                                />
                                                {errors[index]?.validateDateNextPlanting && (
                                                    <div className="text-danger mt-2">{errors[index].validateDateNextPlanting}</div>
                                                )
                                                }
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Data previsão da colheita*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataPrevisaoColheita || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataPrevisaoColheita")}
                                                    required
                                                />
                                                {errors[index]?.validateDateNextHarvest && (
                                                    <div className="text-danger mt-2">{errors[index].validateDateNextHarvest}</div>
                                                )
                                                }
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Integração Lavoura Pecuária - ILP*:</label>
                                                <select className="form-select"
                                                    value={producao?.ilp || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "ilp")}
                                                    required
                                                >
                                                    <option value="true">SIM</option>
                                                    <option value="false">NÃO</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* 🔹 Seleção de Cultura para ambos */}
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <label className="form-label">Cultura*:</label>
                                        <select className="form-control"
                                            value={producao.cultura?.nome || ""}
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "cultura.nome")}
                                            required
                                        >
                                            <option value="">Selecione uma cultura</option>
                                            {culturaOptions.map((cultura, idx) => (
                                                <option key={idx} value={cultura}>
                                                    {cultura}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Botão para adicionar novo Histórico */}
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => handleAddEntry("historico")}
                            style={{
                                backgroundColor: "#25526d",
                                color: "white"
                            }}
                        >
                            Adicionar Histórico
                        </button>
                    </div>
                </div>

            </form >
        </div >
    );
};
