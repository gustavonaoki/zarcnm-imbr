import { validateArea } from "../utils/validateArea";
import { validateCarCode } from "../utils/validateCARCode";
import { validateIBGE } from "../utils/validateIBGE";
import { validateSlope } from "../utils/validateSlop";
import { validateWKTPolygon } from "../utils/validateWKTPolygon";


//Função para retornar erros no campo passado em 'fieldPath'.
export const errorsValidate = (e, fieldPath, setErrors) => {
    const { value } = e.target;
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

    // Validação do Poligono
    if (fieldPath === "propriedade.poligono") {
        const error = validateWKTPolygon(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateWKTPolygon: error,
            }
        }))
    }

    // Validação do Poligono no Talhao
    if (fieldPath === "talhao.poligono") {
        const error = validateWKTPolygon(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [0]: {
                ...prev[0],
                validateWKTPolygonTalhao: error,
            }
        }))
    }

}