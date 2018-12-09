import React, { Component } from 'react'
import './App.css'

const Item = props => {
  return (
    <li className='item' onClick={props.onClick}>
      {props.type === 'folder' && <img className='file_folder_icon' src='/folder.png' />}
      {props.type === 'file' && <img className='file_folder_icon' src='/file.png' />}
      <span>{props.name}</span>
    </li>
  )
}

export default Item
