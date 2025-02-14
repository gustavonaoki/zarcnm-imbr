import { validateArea } from "../utils/validateArea";
import { validateCarCode } from "../utils/validateCARCode";
import { validateIBGE } from "../utils/validateIBGE";
import { validateSlope } from "../utils/validateSlop";
import { validateEmptyField } from "../utils/validateEmptyField";


//Função para retornar erros no campo passado em 'fieldPath'.
export const errorsValidate = (e, fieldPath, setErrors) => {

    const { value } = e.target;
    //Validação da data do inicio monitoramento
    if (fieldPath === "dataInicial") {
        const error = validateEmptyField(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateDateMonitoring: error,
            }
        }))
    }
    //Validação da data do fim monitoramento
    if (fieldPath === "dataFinal") {
        const error = validateEmptyField(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateDateMonitoringEnds: error,
            }
        }))
    }
    //Validação do poligono
    if (fieldPath === "talhao.poligono") {
        const error = validateEmptyField(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validatePolygon: error,
            }
        }))
    }
    // Validação do ibgecode
    if (fieldPath === "propriedade.codigoIbge") {

        const error = validateIBGE(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateIBGE: error,
            }
        }))
    }

    // Validação da area
    if (fieldPath === "talhao.area") {

        const error = validateArea(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateArea: error,
            }
        }))
    }

    // Validação da declividade média
    if (fieldPath === "declividadeMedia") {
        const error = validateSlope(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateSlope: error,
            }
        }))
    }

    // Validação do cõdigo CAR
    if (fieldPath === "propriedade.codigoCar") {
        const error = validateCarCode(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateCarCode: error,
            }
        }))
    }

}