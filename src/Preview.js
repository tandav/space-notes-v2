import React, { Component } from 'react'

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

const Preview = props => {

  if (props.empty) {
    return <div className='preview'></div>
  }
  else {
    return (
      <div className='preview'>
        <h1>Item Preview</h1>
        <li>{props.abs_path}</li>
        <li>{props.description}</li>
        {isimage(props.abs_path) && <img className='image_preview' src={ '/rootlink' + props.abs_path} />}
        <hr/>
        <img className='icon' src='/finder.png' />
        <img className='icon' src='/sublime.png' />
      </div>
    )
  }
}

export default Preview
