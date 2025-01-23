import {validateArea} from "../utils/validateArea";
import { validateIBGE } from "../utils/validateIBGECode";
import { validateSlope } from "../utils/validateSlop";


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
                validateIBGECode: error,
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

}