import React, { Component } from 'react'

const Preview = props => {
  return (
    <div className='preview'>
      <h1>Item Preview</h1>
      <li>{props.abs_path}</li>
      <li>{props.description}</li>
    </div>
  )
}

export default Preview
