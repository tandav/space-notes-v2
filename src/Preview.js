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


  new_item(type) {
    const new_item_name = window.prompt(`Enter new ${type} name`)
    const new_item_command = { 'file' : 'touch', 'folder' : 'mkdir' }

    if (new_item_name.length > 0) {
      this.props.eval_shell_script(`${new_item_command[type]} ${this.props.abs_path}/${new_item_name}`)
      .then(response => {
        if (response.ok) {
          console.log('success actions')
          let dirs_tmp = this.props.dirs
          dirs_tmp[dirs_tmp.length - 1].push({
            'name' : new_item_name,
            'type' : type,
          })
          this.props.setState_App({
            dirs: dirs_tmp })
        }
        else { window.alert('Error in fetch' + response.status) }
      })
    }
    else { window.alert('error: empty name') }
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

        <img className='icon' src='/finder.png'  onClick={() => this.props.eval_shell_script(`open -R '${this.props.abs_path}'`)}/>
        <img className='icon' src='/sublime.png' onClick={() => this.props.eval_shell_script(`open -a 'Sublime Text' '${this.props.abs_path}'`)}/>
        <hr/>

        {
          this.props.type === 'file' && (
            <div>
              <li>{this.props.description}</li>
              {isimage(this.props.abs_path) && <img className='image_preview' src={ '/rootlink' + this.props.abs_path} />}
            </div>
          )
        }
        {
          this.props.type === 'folder' && (
            <div>
              <span>new</span>
              <img className='icon' src='/folder.png' onClick={() => this.new_item('folder')}/>
              <img className='icon' src='/file.png'   onClick={() => this.new_item('file'  )}/>
            </div>
          )
        }

      </div>
    )
    // }
  }
}

export default Preview
