import React from 'react'


let test_style = {
  // color: 'red',
}

const Item = props => {
  return (
    <li 
      className = {props.selected ? 'item selected' : 'item'}
      onClick = {props.onClick}
    >
      {props.type === 'folder' && <img className='icon' src='/folder.png' alt='folder icon'/>}
      {props.type === 'file' && <img className='icon' src='/file.png' alt='file icon'/>}
      <span style={test_style}>{props.name}</span>
    </li>
  )
}

export default Item
