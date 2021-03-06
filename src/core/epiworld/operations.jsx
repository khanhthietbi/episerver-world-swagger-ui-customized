import React from "react"
import PropTypes from "prop-types"
import Im from "immutable"

const SWAGGER2_OPERATION_METHODS = [
  "get", "put", "post", "delete", "options", "head", "patch"
]

const OAS3_OPERATION_METHODS = SWAGGER2_OPERATION_METHODS.concat(["trace"])


export default class Operations extends React.Component {

  static propTypes = {
    specSelectors: PropTypes.object.isRequired,
    specActions: PropTypes.object.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    getComponent: PropTypes.func.isRequired,
    oas3Selectors: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired,
    authSelectors: PropTypes.object.isRequired,
    getConfigs: PropTypes.func.isRequired,
    fn: PropTypes.func.isRequired
  };

  render() {
    let {
      specSelectors,
      getComponent,
      oas3Selectors,
      layoutSelectors,
      layoutActions,
      getConfigs,
      fn
    } = this.props

    let taggedOps = specSelectors.taggedOperations()

    const OperationContainer = getComponent("OperationContainer", true)
    const OperationTag = getComponent("OperationTag")

    let {
      maxDisplayedTags,
    } = getConfigs()

    // Custom filter by tag and OperationId
    let filter = layoutSelectors.currentFilter()
    let methodFltr, urlFltr, tagFltr,opIdFltr
    if (filter)
    {
      //post|/api/v1.0/projects/{projectId}/environments/{environment}/databases/{databaseName}/exports|DatabaseExports|DatabaseExportApi_ExportDatabase
      let spl = filter.split('|')
      methodFltr = spl[0]
      urlFltr = spl[1]
      tagFltr = spl[2]
      opIdFltr = spl[3]

      if (tagFltr) {
        if (filter !== true) {
          taggedOps = fn.opsFilter(taggedOps, tagFltr)
        }
      }
    }

    if (maxDisplayedTags && !isNaN(maxDisplayedTags) && maxDisplayedTags >= 0) {
      taggedOps = taggedOps.slice(0, maxDisplayedTags)
    }
    
    return (
        <div>
          {
            taggedOps.map( (tagObj, tag) => {
              let operations = tagObj.get("operations")
              let filtered = operations
              // Filter by OperationId
              if (typeof(opIdFltr) !== "undefined" && opIdFltr !== "")
              {
                filtered = filtered.filter(op => op.get("operation").get("operationId") === opIdFltr)
              }
              // Filter by Operation URL
              if (typeof(urlFltr) !== "undefined" && urlFltr !== "")
              {
                filtered = filtered.filter(op => op.get("path") === urlFltr)
              }
              // Filter by method
              if (typeof(methodFltr) !== "undefined" && methodFltr !== "")
              {
                filtered = filtered.filter(op => op.get("method") === methodFltr)
              }
              // Fallback
              operations = filtered.size == 0 ? operations.filter((op,k) => k === 0) : filtered

              return (
                <OperationTag
                  key={"operation-" + tag}
                  tagObj={tagObj}
                  tag={tag}
                  oas3Selectors={oas3Selectors}
                  layoutSelectors={layoutSelectors}
                  layoutActions={layoutActions}
                  getConfigs={getConfigs}
                  getComponent={getComponent}
                  specUrl={specSelectors.url()}>
                  {
                    operations.map( op => {
                      console.log(op)
                      const path = op.get("path")
                      const method = op.get("method")
                      const specPath = Im.List(["paths", path, method])


                      // FIXME: (someday) this logic should probably be in a selector,
                      // but doing so would require further opening up
                      // selectors to the plugin system, to allow for dynamic
                      // overriding of low-level selectors that other selectors
                      // rely on. --KS, 12/17
                      const validMethods = specSelectors.isOAS3() ?
                            OAS3_OPERATION_METHODS : SWAGGER2_OPERATION_METHODS

                      if(validMethods.indexOf(method) === -1) {
                        return null
                      }

                      return <OperationContainer
                                 key={`${path}-${method}`}
                                 specPath={specPath}
                                 op={op}
                                 path={path}
                                 method={method}
                                 tag={tag}
                                 />
                    }).toArray()
                  }


                </OperationTag>
              )
            }).toArray()
          }

          { taggedOps.size < 1 ? <h3> No operations defined in spec! </h3> : null }
        </div>
    )
  }

}

Operations.propTypes = {
  layoutActions: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
  specActions: PropTypes.object.isRequired,
  layoutSelectors: PropTypes.object.isRequired,
  getComponent: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired
}
