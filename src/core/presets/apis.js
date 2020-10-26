import BasePreset from "./base"
import WolrdPreset from "./world"
import OAS3Plugin from "../plugins/oas3"

// Just the base, for now.

export default function PresetApis() {

  return [
    BasePreset,
    WolrdPreset,
    OAS3Plugin
  ]
}