import React from "react"
import PropTypes from "prop-types"
import ImPropTypes from "react-immutable-proptypes"
import Im from "immutable"
import { createDeepLinkPath, escapeDeepLinkPath, sanitizeUrl } from "core/utils"
import { buildUrl } from "core/utils/url"
import { isFunc } from "core/utils"

export default class OperationTag extends React.Component {

  static defaultProps = {
    tagObj: Im.fromJS({}),
    tag: "",
  }

  static propTypes = {
    tagObj: ImPropTypes.map.isRequired,
    tag: PropTypes.string.isRequired,

    oas3Selectors: PropTypes.func.isRequired,
    layoutSelectors: PropTypes.object.isRequired,
    layoutActions: PropTypes.object.isRequired,

    getConfigs: PropTypes.func.isRequired,
    getComponent: PropTypes.func.isRequired,

    specUrl: PropTypes.string.isRequired,

    children: PropTypes.element,
  }

  render() {
    const {
      tagObj,
      tag,
      children,
      oas3Selectors,
      layoutSelectors,
      layoutActions,
      getConfigs,
      getComponent,
      specUrl,
    } = this.props

    let {
      docExpansion,
      deepLinking,
    } = getConfigs()

    const isDeepLinkingEnabled = deepLinking && deepLinking !== "false"

    const Collapse = getComponent("Collapse")
    const Markdown = getComponent("Markdown", true)
    const DeepLink = getComponent("DeepLink")
    const Link = getComponent("Link")

    let tagDescription = tagObj.getIn(["tagDetails", "description"], null)
    let tagExternalDocsDescription = tagObj.getIn(["tagDetails", "externalDocs", "description"])
    let rawTagExternalDocsUrl = tagObj.getIn(["tagDetails", "externalDocs", "url"])
    let tagExternalDocsUrl
    if (isFunc(oas3Selectors) && isFunc(oas3Selectors.selectedServer)) {
      tagExternalDocsUrl = buildUrl( rawTagExternalDocsUrl, specUrl, { selectedServer: oas3Selectors.selectedServer() } )
    }    

    let isShownKey = ["operations-tag", tag]
    let showTag = layoutSelectors.isShown(isShownKey, docExpansion === "full" || docExpansion === "list")

    return (
      <div className={showTag ? "opblock-tag-section is-open" : "opblock-tag-section"} >

        <div
          className={!tagDescription ? "opblock-tag no-desc" : "opblock-tag" }
          id={isShownKey.map(v => escapeDeepLinkPath(v)).join("-")}
          data-tag={tag}
          data-is-open={showTag}
          >
          {tag} / {tagDescription}

            <div>
              { !tagExternalDocsDescription ? null :
                <small>
                    { tagExternalDocsDescription }
                      { tagExternalDocsUrl ? ": " : null }
                      { tagExternalDocsUrl ?
                        <Link
                            href={sanitizeUrl(tagExternalDocsUrl)}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            >{tagExternalDocsUrl}</Link> : null
                          }
                  </small>
                }
            </div>
        </div>

        <Collapse isOpened={showTag}>
          {children}
        </Collapse>
      </div>
    )
  }
}
