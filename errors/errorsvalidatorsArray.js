import { validateGroundCover } from "../utils/validateGroundCover";
import { validateNDTI, validateNDVI } from "../utils/validateNDVI_NDTI";

//Função para retornar erros em um array nos formulários.
export const errorsValidateArray = (e, index, arrayField, fieldPath, setErrors) => {
    const { value } = e.target;

    // Validação da coberturaSolo
    if (arrayField === "producoes" && fieldPath === "coberturaSolo") {

        const error = validateGroundCover(value); // Chama a validação externa
        setErrors((prev) => ({
            ...prev,
            [index]: {
                ...prev[index],
                validateGroundCover: error,
            }
        }))
    }

    // Validação da ndvi
    if (arrayField === "indices" && fieldPath === "ndvi") {

        const error = validateNDVI(value); // Chama a validação externa
        setErrors((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            validateNDVI: error,
          }
        }))
      }
  
      // Validação da ndti
      if (arrayField === "indices" && fieldPath === "ndti") {
  
        const error = validateNDTI(value); // Chama a validação externa
        setErrors((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            validateNDTI: error,
          }
        }))
      }
  
      // Validação da coberturaSolo
      if (arrayField === "interpretacoesCultura" && fieldPath === "coberturaSolo") {
  
        const error = validateGroundCover(value); // Chama a validação externa
        setErrors((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            validateGroundCover: error,
          }
        }))
      }

}