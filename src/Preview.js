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
          let dirs_tmp = this.props.dirs
          dirs_tmp[dirs_tmp.length - 1].push({
            'name' : new_item_name,
            'type' : type,
          })
          this.props.setState_App({ dirs: dirs_tmp })
        }
        else { window.alert('Error in fetch' + response.status) }
      })
    }
    else { window.alert('error: empty name') }
  }

  delete_item() {
    this.props.eval_shell_script(`mv '${this.props.abs_path}' ~/.Trash/$(basename ${this.props.abs_path})`)
    .then(response => {
      if (response.ok) {
        if (this.props.type === 'file') {
          // todo: deselect etc
        }
        if (this.props.type === 'folder') {
          // todo: deselect etc
        }
        // let dirs_tmp = this.props.dirs
        // dirs_tmp[dirs_tmp.length - 1].push({
        //   'name' : new_item_name,
        //   'type' : type,
        // })
        // this.props.setState_App({ dirs: dirs_tmp })
      }
      else { window.alert('Error in fetch' + response.status) }
    })
  }

  render() {
    if (this.props.abs_path) {
      return (
        <div className='preview'>
          <h1>{this.props.type}</h1>
          <p>{this.props.abs_path}</p>
          <img className='icon' src='/finder.png'  onClick={() => this.props.eval_shell_script(`open -R '${this.props.abs_path}'`)}/>
          <img className='icon' src='/sublime.png' onClick={() => this.props.eval_shell_script(`open -a 'Sublime Text' '${this.props.abs_path}'`)}/>
          <img className='icon' src='/trash.png'   onClick={() => this.delete_item()} />
          <hr/>
  
          {
            this.props.type === 'file' && (
              <div>
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
    }
    else {
      return <div className='preview'></div>
    }
  }
}

export default Preview
