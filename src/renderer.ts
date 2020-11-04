/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// Import deps
const autoprefixer = require('autoprefixer')
const postcssSorting = require('postcss-sorting')
const postcss = require('postcss')
const beautify = require('beautify')
const monaco = require('monaco-editor')

// Import utils
import { sortOrder } from './utils/sort-order'

// Import styles
import './styles/bootstrap.min.css'
import './styles/index.css'

// Cache HTML elements
const processBtn: HTMLButtonElement = document.querySelector('#process-btn')
const prettifyBtn: HTMLButtonElement = document.querySelector('#prettify-btn')
const inputCSSBox: HTMLTextAreaElement = document.querySelector('#input-css')
const inputCSSBoxMonaco: HTMLTextAreaElement = document.querySelector('#input-css .view-lines')
const resultBox: HTMLTextAreaElement = document.querySelector('#result-box')
const resultBoxMonaco: HTMLTextAreaElement = document.querySelector('#result-box .view-lines')
const browserlistInput: HTMLInputElement = document.querySelector('#browserlist-input')

// Turn input div/textarea into Monaco editor
const inputEditor = monaco.editor.create(inputCSSBox, {
	language: "css",
	lineNumbers: "on",
	roundedSelection: false,
	scrollBeyondLastLine: false,
  readOnly: false,
  minimap: { enabled: false },
  automaticLayout: true,
	// theme: "vs-dark",
})

// monaco.editor.create(resultBox, {
// 	language: "css",
// 	lineNumbers: "on",
// 	roundedSelection: false,
// 	scrollBeyondLastLine: false,
//   readOnly: false,
//   minimap: { enabled: false },
//   automaticLayout: true,
// 	theme: "vs-dark",
// })

/* Testing CSS
a {
  border: 0;
margin-top: 0;
  position: relative;
left: 0;
display: flex;
  padding: 0;
  border-radius: 0;
  opacity: 0;
  box-sizing: border-box;
}
*/

// Prettify input CSS
// ! NOTE: this may not work with Monaco editor
// It is also probably redundant since Monaco
// has built-in formatting
function prettifyCSS() {
  const inputCSS = inputCSSBox.value// 'a {display: flex;}'
  const prettyCSS = beautify(inputCSS, { format: 'css' })

  // console.log(prettyCSS)

  inputCSSBox.value = prettyCSS
}

// Generate prefixed CSS
function processCss() {
  // const inputCSS = inputCSSBox.value // 'a {display: flex;}'
  // const inputCSS = inputCSSBox.innerText // 'a {display: flex;}'
  const inputCSSMonaco = inputEditor.getValue()
  const browserlistPreset = browserlistInput.value.split(', ') // ['ie >= 10', 'last 7 versions', 'last 2 safari versions', 'not op_mini all']
  const params = {
    overrideBrowserslist: browserlistPreset,
    grid: 'autoplace'
  }

  const result = postcss([
    autoprefixer(params),
    postcssSorting({
      order: ['custom-properties', 'dollar-variables', 'declarations', 'rules', 'at-rules'],
      'properties-order': sortOrder,
      'unspecified-properties-position': 'bottom'
    })
  ])
  .process(inputCSSMonaco, {from: undefined})
  .then((res: any) => {
    res.warnings().forEach((warn: any) => {
      console.warn(warn.toString())
    })

    const cssData = beautify(res.css, { format: 'css' })

    // console.log(cssData)

    resultBox.value = cssData
  })
  .catch((error: string) => {
    console.log(error)
    // TODO: Add message to HTML
  })
}

// Add event listeners
processBtn.addEventListener('click', processCss)
prettifyBtn.addEventListener('click', prettifyCSS)

// processCss()

console.log('👋 This message is being logged by "renderer.js", included via webpack')
