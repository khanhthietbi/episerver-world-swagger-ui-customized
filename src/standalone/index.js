import StandaloneLayout from "./layout"
import CustomPlugin from "plugins/custom"
import ConfigsPlugin from "corePlugins/configs"

// the Standalone preset

export default [
  CustomPlugin,
  ConfigsPlugin,
  () => {
    return {
      components: { StandaloneLayout }
    }
  }
]
