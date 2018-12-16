import React, { Component } from 'react'
import './App.css'
import AceEditor from 'react-ace'
import 'brace/mode/markdown'
import 'brace/theme/github'

class Editor extends Component {

  onChange(newValue) {
    console.log('change',newValue);
  }

  render() {
    return(
      <AceEditor
        mode='markdown'
        theme='github'
        onChange={this.onChange}
        fontSize={10}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
          $fontFamily: "Menlo"
        }}
      />
    )
  }
}

export default Editor
