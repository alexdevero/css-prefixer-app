const monaco = require('monaco-editor')

import { inputCSSBox } from './variables'

// Turn input div/textarea into Monaco editor
export const inputEditor = monaco.editor.create(inputCSSBox, {
	language: "css",
	lineNumbers: "on",
	roundedSelection: false,
	scrollBeyondLastLine: false,
  readOnly: false,
  minimap: { enabled: false },
  automaticLayout: true,
	// theme: "vs-dark",
})

// export const outputEditor = monaco.editor.create(resultBox, {
// 	language: "css",
// 	lineNumbers: "on",
// 	roundedSelection: false,
// 	scrollBeyondLastLine: false,
//   readOnly: false,
//   minimap: { enabled: false },
//   automaticLayout: true,
// 	theme: "vs-dark",
// })
