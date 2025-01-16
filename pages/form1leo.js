import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputMask from "react-input-mask";
import { culturaOptions } from "../optionsInputs/culturas";
import { fillTestValues_NM1a } from "../teste_exemplos/NM1a";
import { fillTestValues_NM1b } from "../teste_exemplos/NM1b";
const FormPage = () => {
    // Validador de CPF
    const validateCPF = (cpf) => {
        if (!cpf) return true; // Verifica se o CPF está definido
        const cleanCPF = cpf.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (cleanCPF.length !== 11) {
            return false;
        }
        return true;
    };

    // Validador de Código IBGE (7 dígitos)
    const validateIBGECode = (ibgeCode) => {
        if (!ibgeCode) return true; // Verifica se o ibgeCode está definido
        const cleanIBGECode = ibgeCode.replace(/\D/g, ""); // Remove caracteres não numéricos
        if (cleanIBGECode.length !== 7) {
            return false;
        }
        return true;
    }


    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        produtor: {
            nome: "João da Silva",
            cpf: "12345678000",
        },
        propriedade: {
            nome: "Fazenda Capim Macio",
            codigoCar: "MT-5107248-1025F299474640148FE845C7A0B62635",
            codigoIbge: "3509502",
            poligono:
                "POLYGON((-58.9144585643381 -13.5072128852218,...))",
        },
        talhao: {
            poligono:
                "POLYGON((-58.67396951647091186 -13.24646265710462245,...))",
            area: 10,
            tipoProdutor: "Proprietário",
        },
        manejos: [
            {
                data: "2021-01-28",
                operacao: { nomeOperacao: "Revolvimento do solo" },
                tipoOperacao: { tipo: "ARACAO" },
            },
        ],
        producoes: [
            {
                dataPlantio: "2023-10-28",
                dataColheita: "2024-02-28",
                dataPrevisaoPlantio: "2023-10-28",
                dataPrevisaoColheita: "2024-02-28",
                coberturaSolo: 40,
                ilp: "SIM",
                cultura: { nome: "Soja (grão)" },
                tipoOperacao: { tipo: "ARACAO" },
                isHistorical: true,
            },
        ],
    });

    // Função para atualizar o estado do formulário
    const handleChange = (e, fieldPath) => {
        const { value } = e.target;

        setFormData((prev) => {
            const keys = fieldPath.split("."); // Divide 'propriedade.nome' em ['propriedade', 'nome']
            const updatedData = { ...prev };

            let current = updatedData;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                current[key] = { ...current[key] }; // Cria cópias para evitar mutações diretas
                current = current[key];
            }

            current[keys[keys.length - 1]] = value; // Atualiza o valor final

            return updatedData;
        });
    };

    // Função para atualizar o estado do formulário em campos de array
    const handleArrayChange = (e, index, arrayField, fieldPath) => {
        const { value } = e.target;

        setFormData((prev) => {
            const updatedArray = [...prev[arrayField]];

            if (updatedArray[index]) {
                const keys = fieldPath.split("."); // Divide o caminho aninhado em partes
                let current = updatedArray[index];

                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    current[key] = { ...current[key] }; // Cria uma cópia do objeto para evitar mutações diretas
                    current = current[key];
                }

                current[keys[keys.length - 1]] = value; // Atualiza o valor final
            }

            return { ...prev, [arrayField]: updatedArray };
        });
    };


    // Função para enviar os dados do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValidCPF = validateCPF(formData.produtor.cpf);
        if (!isValidCPF) {
            alert("CPF inválido");
            return;
        }

        const isValidIBGECode = validateIBGECode(formData.propriedade.codigoIbge);
        if (!isValidIBGECode) {
            alert("Código IBGE inválido");
            return;
        }

        console.log(formData);

        try {
            const response = await fetch("/api/v1/status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });



            if (response.ok) {
                alert("Dados enviados com sucesso!");
            } else {
                alert("Erro ao enviar os dados.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const addEntry = (arrayField, defaultValues) => {
        setFormData((prev) => ({
            ...prev,
            [arrayField]: [...prev[arrayField], defaultValues],
        }));
    };

    const [addOption, setAddOption] = useState("");

    const handleAddEntry = (option) => {
        if (option === "historical") {
            addEntry("producoes", {
                dataPlantio: "",
                dataColheita: "",
                coberturaSolo: 0,
                ilp: "",
                cultura: { nome: "" },
                //tipoOperacao: { tipo: "" },
                isHistorical: true, // Define que é um Histórico
            });
        } else if (option === "next") {
            addEntry("producoes", {
                dataPrevisaoPlantio: "",
                dataPrevisaoColheita: "",
                ilp: "",
                cultura: { nome: "" },

                isHistorical: false, // Define que é uma Próxima Cultura
            });
        }
    };


    return (
        <div className="container-fluid my-4">
            <h1 className="text-center mb-4">Formulário de Cadastro</h1>
            <h6 className="text-danger text-center">
                Informações obrigatórias estão marcadas com *
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
                                    value={formData.produtor?.nome || ""} //Exibe o valor do campo nome do produtor
                                    onChange={(e) => handleChange(e, "produtor.nome")}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">CPF:</label>
                                <InputMask
                                    mask={"999.999.999-99"} //Máscara para o campo de CPF
                                    type="text"
                                    name="cpf"
                                    className="form-control"
                                    placeholder="EX: 12345678900"
                                    value={formData.produtor?.cpf || ""}
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
                                placeholder="EX: Fazenda Santa Maria"
                                value={formData.propriedade?.nome || ""}
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
                                value={formData.propriedade?.codigoCar || ""}
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
                                value={formData.propriedade?.codigoIbge || ""}
                                placeholder="EX: 3509502"
                                onChange={(e) => handleChange(e, "propriedade.codigoIbge")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Polígono (Formato WKT):</label>
                            <textarea
                                name="poligono"
                                className="form-control"
                                value={formData.propriedade?.poligono || ""}
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
                                value={formData.talhao?.poligono || ""}
                                placeholder="EX: POLYGON((-58.9144585643381 -13.5072128852218,...))"
                                onChange={(e) => handleChange(e, "talhao.poligono")}
                            ></textarea>
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
                                required
                                placeholder="EX: 25"
                                value={formData.talhao?.area || ""}
                                onChange={(e) => handleChange(e, "talhao.area")}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tipo do produtor (Proprietário ou Arrendatário)*: </label>
                            <select
                                required
                                name="tipoProdutor"
                                value={formData.talhao?.tipoProdutor || ""}
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
                        {formData.manejos.map((manejo, index) => (
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
                                    min={0}
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
                            onClick={() =>
                                addEntry("manejos", { dataOperacao: "", operacao: "", tipoOperacao: "" })
                            }>
                            Adicionar Operação
                        </button>
                    </div>
                </div>

                {/* Histórico de culturas na gleba/talhão: */}
                <div className="mb-4 card border-0 shadow-sm">
                    <div className="card-header text-white" style={{ backgroundColor: "#0b4809" }}>
                        <h2 className="mb-0">Histórico/Próxima culturas na gleba/talhão:</h2>
                    </div>
                    <div className="card-body">
                        {formData.producoes.map((producao, index) => (
                            <div key={index} className="mb-3">
                                <div className="card-header text-white" style={{ backgroundColor: "#006400" }}>
                                    {producao.isHistorical === true
                                        ? <h4 className="mb-0">Histórico de culturas</h4>
                                        : <h4 className="mb-0">Próxima culturas</h4>
                                    }
                                </div>
                                {index > 0 && <hr className="my-4" />} {/* Adiciona um <hr> a partir do segundo item */}

                                {/* Campo de Data do plantio e colheita(historico) */}
                                {producao.isHistorical === true && (
                                    <>
                                        <label className="form-label">
                                            Data do plantio*: (real ao aproximada)
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={producao?.dataPlantio || ""}
                                            name="dataPlantio"
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "dataPlantio")}
                                            required
                                        />

                                        <label className="form-label">
                                            Data previsão da colheita*: (real ao aproximada)
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={producao?.dataColheita || ""}
                                            name="dataColheita"
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "dataColheita")}
                                            required
                                        />
                                    </>
                                )}

                                {/* Campo de Data da previsao do plantio e colheita (proxima cultura)*/}
                                {producao.isHistorical === false && (
                                    <>
                                        <label className="form-label">
                                            Data previsão do plantio*:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={producao?.dataPrevisaoPlantio || ""}
                                            name="dataPlantio"
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "dataPrevisaoPlantio")}
                                            required
                                        />

                                        <label className="form-label">
                                            Data previsão da colheita*:
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={producao?.dataPrevisaoColheita || ""}
                                            name="dataColheita"
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "dataPrevisaoColheita")}
                                            required
                                        />
                                    </>
                                )}


                                {/* Exibir Cobertura do Solo apenas para Histórico */}
                                {producao.isHistorical && (
                                    <>
                                        <label className="form-label">Cobertura do solo (%)*:</label>
                                        <input
                                            type="number"
                                            name="coberturaSolo"
                                            min={0}
                                            max={100}
                                            className="form-control"
                                            required
                                            value={producao?.coberturaSolo || ""}
                                            onChange={(e) => handleArrayChange(e, index, "producoes", "coberturaSolo")}
                                        />
                                    </>
                                )}

                                {/*<label className="form-label">Tipo da Operação*: </label>
                                <input
                                    type="text"
                                    required
                                    name="tipoOperacao"
                                    className="form-control"
                                    placeholder="EX: ARACAO"
                                    value={producao.tipoOperacao?.tipo || ""}
                                    onChange={(e) => handleArrayChange(e, index, "producoes", "tipoOperacao.tipo")}
                                />*/}

                                <label className="form-label">Integração Lavoura Pecuária - ILP (SIM/NÃO)*: </label>
                                <select
                                    required
                                    name="ILP"
                                    className="form-select"
                                    value={producao?.ilp || ""}
                                    onChange={(e) => handleArrayChange(e, index, "producoes", "ilp")}
                                >
                                    <option value="1">SIM</option>
                                    <option value="0">NÃO</option>
                                </select>

                                <label className="form-label">Cultura*: </label>
                                <select
                                    required
                                    name="cultura"
                                    className="form-control"
                                    value={producao.cultura?.nome || ""}
                                    onChange={(e) => handleArrayChange(e, index, "producoes", "cultura.nome")}
                                >
                                    <option value="">Selecione uma cultura</option>
                                    {culturaOptions.map((cultura, idx) => (
                                        <option key={idx} value={cultura}>
                                            {cultura}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* Select e Botão para Adicionar Histórico ou Próxima Cultura */}
                        <div className="d-flex col-md-2 gap-2">
                            <select
                                className="form-select"
                                value={addOption}
                                onChange={(e) => setAddOption(e.target.value)}
                            >
                                <option value="">Selecione uma opção</option>
                                <option value="historical">Adicionar Histórico</option>
                                <option value="next">Adicionar Próxima Cultura</option>
                            </select>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    handleAddEntry(addOption);
                                }}
                                disabled={!addOption}
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>


                {/* Botões */}
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-success">
                        Enviar
                    </button>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-success" onClick={ () => fillTestValues_NM1a(setFormData)}>
                        TESTE NM1a
                    </button>
                </div>
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-success" onClick={ () => fillTestValues_NM1b(setFormData)}>
                        TESTE NM1b
                    </button>
                </div>
                
            </form>
        </div>
    );
};

export default FormPage;
