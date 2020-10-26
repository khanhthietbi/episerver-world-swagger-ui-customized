import Parameters from "../epiworld/parameters"
import ParameterRow from "../epiworld/parameter-row"
import Responses from "../epiworld/responses"
import Response from "../epiworld/response"
import ModelExample from "../epiworld/model-example"
import Operations from "../epiworld/operations"
import OperationTag from "../epiworld/operation-tag"

export default function() {

  let coreComponents = {
    components: {
      parameters: Parameters,
      parameterRow: ParameterRow,
      responses: Responses,
      response: Response,
      modelExample: ModelExample,
      operations: Operations,
      OperationTag
    }
  }

  return [
    coreComponents
  ]
}
