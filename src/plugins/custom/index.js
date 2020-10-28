import Parameters from "../../core/epiworld/parameters"
import ParameterRow from "../../core/epiworld/parameter-row"
import Responses from "../../core/epiworld/responses"
import Response from "../../core/epiworld/response"
import ModelExample from "../../core/epiworld/model-example"
import Operations from "../../core/epiworld/operations"
import OperationTag from "../../core/epiworld/operation-tag"

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
    },
    fn: {
      opsFilter: (taggedOps, phrase) => {
        const phrases = phrase.split(", ")
        return taggedOps.filter((val, key) => {
          return phrases.some(item => key == item)
        })
      }
    }
  }

  return [
    coreComponents
  ]
}
