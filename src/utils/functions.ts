// Import deps
const autoprefixer = require('autoprefixer')
const postcssSorting = require('postcss-sorting')
const postcss = require('postcss')
const beautify = require('beautify')

// Import utils
import { sortOrder } from './sort-order'
import {
  browserlistInput,
  inputCSSBox,
  processBtn,
  prettifyBtn,
  resultBox
} from './variables'
import { inputEditor } from './monaco-config'

// Prettify input CSS
// ! NOTE: this may not work with Monaco editor
// It is also probably redundant since Monaco
// has built-in formatting
export function prettifyCSS() {
const inputCSS = inputCSSBox.value// 'a {display: flex;}'
  const prettyCSS = beautify(inputCSS, { format: 'css' })

  // console.log(prettyCSS)

  inputCSSBox.value = prettyCSS
}

// Generate prefixed CSS
export function processCss() {
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

export function initApp() {
  // Add event listeners
  processBtn.addEventListener('click', processCss)
  prettifyBtn.addEventListener('click', prettifyCSS)
}
