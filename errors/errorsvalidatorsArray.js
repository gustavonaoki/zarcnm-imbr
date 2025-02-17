import { validateGroundCover } from "../utils/validateGroundCover";
import { validateNDTI, validateNDVI } from "../utils/validateNDVI_NDTI";
import { validateEmptyField } from "../utils/validateEmptyField";


//Função para retornar erros em um campo, passado em 'fieldPath' de um array, passado em 'arrayFiedl'.
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

  //Validação da data de manejo
  if (arrayField === "manejos" && fieldPath === "data") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDate: error,
      }
    }))
  }
  //Validação da data do pixel
  if (arrayField === "indices" && fieldPath === "data") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDatePixelImg: error,
      }
    }))
  }
  //Validação da data do plantio cultura
  if (arrayField === "producoes" && fieldPath === "dataPlantio") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDatePlanting: error,
      }
    }))
  }
  //Validação da data da colheita cultura
  if (arrayField === "producoes" && fieldPath === "dataColheita") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDateHarvest: error,
      }
    }))
  }
  //Validação da data do próximo de plantio da cultura
  if (arrayField === "producoes" && fieldPath === "dataPrevisaoPlantio") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDateNextPlanting: error,
      }
    }))
  }
  //Validação da data da próxima colheita cultura
  if (arrayField === "producoes" && fieldPath === "dataPrevisaoColheita") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateDateNextHarvest: error,
      }
    }))
  }

  //Validação da nome da operação
  if (arrayField === "manejos" && fieldPath === "operacao.nomeOperacao") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateOperationName: error,
      }
    }))
  }
  //Validação da tipo da operação
  if (arrayField === "manejos" && fieldPath === "tipoOperacao.tipo") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateOperationType: error,
      }
    }))
  }
  //Validação da nome do sátelite
  if (arrayField === "indices" && fieldPath === "satelite") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateSatellite: error,
      }
    }))
  }
  //Validação da nome do sátelite
  if (arrayField === "indices" && fieldPath === "coordenada") {

    const error = validateEmptyField(value); // Chama a validação externa


    setErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        validateCoordinateWKT: error,
      }
    }))
  }
}