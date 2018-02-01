import React, { Component } from 'react'
import codemirror from 'codemirror'
import 'codemirror/mode/meta.js'
const requireCodemirrorMode = require.context('url-loader?limit=1&name=js/codemirror/[name].[hash].[ext]!codemirror/mode/', true, /\.js$/)
import EditorDisplay from 'stemn-shared/misc/Editor/EditorDisplay.jsx'
import { load } from 'stemn-shared/misc/LazyLoading/LazyLoading.utils'
import Container from 'stemn-shared/misc/Layout/Container'

export default class Viewer extends Component {
  getCodemirrorRef = (ref) => {
    const { data, extension } = this.props
    
    if (ref && extension) {
      this.codemirrorRef = ref
      this.codemirrorRef.innerHTML = ''
      const editorInstance = codemirror(this.codemirrorRef, {
        value: data,
        indentWithTabs: true,
        readOnly: true,
        dragDrop: false,
        lineWrapping: true,
        lineNumbers: true,
      })
      // Get Mode
      const modeInfo = codemirror.findModeByExtension(extension)
      const mode = modeInfo ? modeInfo.mode : 'null'
      if (mode && mode != 'null') {
        const modePath = `./${mode}/${mode}.js`
        const webpackModePath = requireCodemirrorMode(modePath)

        // Attach codemirror to the window so the mode pack will find it
        window.CodeMirror = codemirror
        // Load the mode
        load([{ src: webpackModePath }]).then(() => {
          // Set the mode after it has loaded
          editorInstance.setOption('mode', mode)
        })
      }
    }
  }
  render() {
    const { data, previewMarkdown } = this.props

    return (
      <div className="layout-row flex">
        { previewMarkdown &&
            <div className="scroll-box flex" style={ { padding: '30px' } }>
              <Container>
                <EditorDisplay value={ data } />
              </Container>
            </div>
        }
        { !previewMarkdown &&
            <div className="scroll-box flex" ref={ this.getCodemirrorRef } />
        }
      </div>
    )
  }
}
