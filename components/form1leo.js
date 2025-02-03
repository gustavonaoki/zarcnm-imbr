import { useState, useEffect, useMemo } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from "react-input-mask";
import { culturaOptions } from "../optionsInputs/culturas";
import { modeloCadastroGleba } from "../modelos/modeloCadastroGleba";
import { errorsValidate } from "../errors/errorsValidators";
import { errorsValidateArray } from "../errors/errorsvalidatorsArray";

export default function Form1({ initialData, onSubmit }) {
    // 🔹 Inicializa o estado corretamente sem `useEffect` dentro
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
    const [countNextCulture, setCountNextCulture] = useState(0) //Contador de campos proxima cultura, maximo 1
    const nextCulture = cadastroGleba.producoes.find((elemento) => elemento.isHistorical === false) //Procura proxima cultura no cadastro da gleba, validação necessária pra o preenchimento automatico.

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
        errorsValidateArray(e, index, arrayField, fieldPath, setErrors);
    };

    const handleAddEntry = (option) => {

        if(option === "manejos"){
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
        if(option === "historico"){
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

    } // 🔹 Garante que re-renderiza quando necessário

    

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
                                    placeholder="Ex: José da Silva"
                                    value={cadastroGleba.produtor?.nome || ""} //Exibe o valor do campo nome do produtor
                                    onChange={(e) => handleChange(e, "produtor.nome")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF:</label>
                                <InputMask
                                    mask={"999.999.999-99"}
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="EX: 12345678900"
                                    value={cadastroGleba.produtor?.cpf || ""}
                                    onChange={(e) => handleChange(e, "produtor.cpf")}
                                />
                                {errors.produtor?.cpf && (
                                    <small className="text-danger">{errors.produtor.cpf}</small>
                                )}
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
                                placeholder="EX: Fazenda Santa Maria"
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
                                required
                                value={cadastroGleba.propriedade?.codigoCar || ""}
                                placeholder="EX: MT-5107248-1025F299474640148FE845C7A0B62635"
                                onChange={(e) => handleChange(e, "propriedade.codigoCar")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Código IBGE:</label>
                            <input
                                type="text"
                                name="codigoIbge"
                                className="form-control"
                                value={cadastroGleba.propriedade?.codigoIbge || ""}
                                placeholder="EX: 3509502"
                                onChange={(e) => handleChange(e, "propriedade.codigoIbge")}
                            />
                            {errors.propriedade?.codigoIbge && (
                                <small className="text-danger">{errors.propriedade.codigoIbge}</small>
                            )}
                        </div>
                        {errors[0]?.validateIBGE && (
                            <div className="text-danger mt-2">{errors[0].validateIBGE}</div>
                        )
                        }
                        <div className="mb-3">
                            <label className="form-label">Polígono (Formato WKT):</label>
                            <textarea
                                name="poligono"
                                className="form-control"
                                value={cadastroGleba.propriedade?.poligono || ""}
                                placeholder="EX: POLYGON((-58.9144585643381 -13.5072128852218,...))"
                                onChange={(e) => handleChange(e, "propriedade.poligono")}
                            ></textarea>
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
                                required
                                className="form-control"
                                value={cadastroGleba.talhao?.poligono || ""}
                                placeholder="EX: POLYGON((-58.9144585643381 -13.5072128852218,...))"
                                onChange={(e) => handleChange(e, "talhao.poligono")}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">
                                Área (Em hectares)*:
                            </label>
                            <input
                                type="text"
                                name="area"
                                className="form-control"
                                required
                                placeholder="EX: 25"
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
                                required
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
                            <div key={index} className="mb-3">
                                <label className="form-label">Data da operação*: </label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="dataOperacao"
                                    value={manejo?.data || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "data")}

                                    required
                                />

                                <label className="form-label">Nome da Operação*: </label>
                                <input
                                    type="text"
                                    name="nomeOperacao"
                                    className="form-control"
                                    required
                                    placeholder="EX: REVOLVIMENTO DO SOLO"
                                    value={manejo.operacao?.nomeOperacao || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "operacao.nomeOperacao")}
                                />

                                <label className="form-label">Tipo da Operação*: </label>
                                <input
                                    type="text"
                                    required
                                    name="tipoOperacao"
                                    className="form-control"
                                    placeholder="EX: ARACAO"
                                    value={manejo.tipoOperacao?.tipo || ""}
                                    onChange={(e) => handleArrayChange(e, index, "manejos", "tipoOperacao.tipo")}
                                />
                            </div>

                        ))}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={()=> handleAddEntry("manejos")}>
                            Adicionar Operação
                        </button>
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
                                style={{
                                    borderLeft: "5px solid " + (producao.isHistorical ? "#006400" : "#228B22"), // 💡 Adiciona apenas borda lateral
                                }}
                            >
                                <div className="card-header text-white fw-bold"
                                    style={{ backgroundColor: producao.isHistorical ? "#006400" : "#0d6efd" }}>
                                    <h4 className="mb-0">
                                        {producao.isHistorical ? "Histórico de culturas" : "Próxima cultura"}
                                    </h4>
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
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Data previsão da colheita*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataColheita || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataColheita")}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Cobertura do solo (%)*:</label>
                                                <input type="text" className="form-control"
                                                    value={producao?.coberturaSolo || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "coberturaSolo")}
                                                    required
                                                />
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
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Data previsão da colheita*:</label>
                                                <input type="date" className="form-control"
                                                    value={producao?.dataPrevisaoColheita || ""}
                                                    onChange={(e) => handleArrayChange(e, index, "producoes", "dataPrevisaoColheita")}
                                                    required
                                                />
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

                        {/* 🔹 Botão para adicionar novo Histórico */}
                        <button className="btn btn-primary mt-3" onClick={()=> handleAddEntry("historico")}>
                            Adicionar Histórico
                        </button>
                    </div>
                </div>

            </form >
        </div >
    );
};
