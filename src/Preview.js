import React, { Component } from 'react'
import { host } from './index'

const isimage = path => {
  const image_extensions = [
    'png', 'jpg', 'jpeg', 'svg'
  ]

  const split = path.split('.')
  const ext = split[split.length - 1]
  
  if (image_extensions.indexOf(ext) > -1) {
    return true
  }
  else {
    return false
  }
}

class Preview extends Component {


  open_in_finder() {
    const opts = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 'path': this.props.abs_path })
    }
    fetch(host + '/finder', opts)
    .then(response => { if (!response.ok) window.alert('Error in fetch' + response.status) })

  }

  eval_shell_script(script) {
    let opts = { 
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ script: script })
    }
    fetch(host + `/shell`, opts)
    .then(response => { if (!response.ok) window.alert('Error in fetch' + response.status) })
  }

  render() {
    // if (this.props.type === 'folder') {
    //   return <div className='preview'>folder preview</div>
    // }
    // if (this.props.type === 'file') {
    return (
      <div className='preview'>
        <h1>Item Preview</h1>
        <li>{this.props.type}</li>
        <li>{this.props.abs_path}</li>

        <img className='icon' src='/finder.png'  onClick={() => this.eval_shell_script(`open -R '${this.props.abs_path}'`)}/>
        <img className='icon' src='/sublime.png' onClick={() => this.eval_shell_script(`open -a 'Sublime Text' '${this.props.abs_path}'`)}/>
        <hr/>

        {
          this.props.type === 'file' && (
            <div>
              <li>{this.props.description}</li>
              {isimage(this.props.abs_path) && <img className='image_preview' src={ '/rootlink' + this.props.abs_path} />}
            </div>
          )
        }

      </div>
    )
    // }
  }
}

export default Preview
