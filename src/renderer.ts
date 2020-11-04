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

// Import utils
import { initApp } from './utils/functions'

// Import styles
import './styles/bootstrap.min.css'
import './styles/index.css'

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

initApp()

console.log('👋 This message is being logged by "renderer.js", included via webpack')
