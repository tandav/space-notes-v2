import React, { Component } from 'react'
import './App.css'

class App extends Component {
  state = {
    items: [
      [
        {name: 'space_1', type: 'folder'},
        {name: 'space_2', type: 'folder'},
        {name: 'file_1', type: 'file'},
        {name: 'file_2', type: 'file'},
        {name: 'file_3', type: 'file'},
      ],
      [
        {name: 'space_3', type: 'folder'},
        {name: 'space_4', type: 'folder'},
        {name: 'file_54', type: 'file'},
        {name: 'file_55', type: 'file'},
        {name: 'file_56', type: 'file'},
        {name: 'file_57', type: 'file'},
        {name: 'file_58', type: 'file'},
      ],
      [
        {name: 'space_45', type: 'folder'},
        {name: 'space_46', type: 'folder'},
        {name: 'file_104', type: 'file'},
        {name: 'file_105', type: 'file'},
      ],
    ],
    selected: ['space_2', 'space_4', 'file_105']
  }

  fake_api() {

  }
  render() {
    return (
      <div className='App'>
        <div className='spaces'>
          {
            this.state.items.map((space, i) => {
              return(
                <ul className='space'>
                  <h1>{i}</h1>
                  {
                    space.map(item => {
                      if (item.name === this.state.selected[i]) {
                        return <li>SELECTED {item.name}</li>
                      }
                      else
                        return <li>{item.name}</li>
                    })
                  }
                </ul>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default App
