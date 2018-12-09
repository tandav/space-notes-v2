import React, { Component } from 'react'
import './App.css'
import { host } from './index'
import Item from './Item'
import Preview from './Preview'

class App extends Component {
  state = {
    root: '/Users/tandav',
    items: [],
    path: undefined,
    preview: undefined,
  }

  componentDidMount() {
    // console.log(window.location.pathname)
    // this.append_dir(window.location.pathname)
    // console.log(this.append_dir(window.location.pathname))
    this.setState({
      path: this.path_split(
        this.state.root, window.location.pathname
      )
    }, this.fetch_every_dir)
  }

  fetch_every_dir() {
    const opts = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        'root': this.state.path[0],
        'path': window.location.pathname,
      })
    }
    fetch(host + '/every_dir_in_path', opts)
    .then(response => { if (response.ok) return response.json()})
    .then(json => { this.setState({ items: json }) })
  }

  path_split(root, path) {
    console.log(root, path)
    let path_arr = []
    path_arr.push(root)
    path_arr = path_arr.concat(path.split(root + '/')[1].split('/'))
    // console.log(path_arr)
    return path_arr
  }




  select(column_i, clicked_item, type) {
    // let n = fake_api()
    // console.log(new_selected_item)


    let new_path_arr = this.state.path.slice(0, column_i + 1)
    if (type === 'folder') {

      new_path_arr = new_path_arr.concat(clicked_item)
      const new_path_str = new_path_arr.join('/')

      const opts = {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          'path': new_path_str,
        })
      } 

      fetch(host + '/last_dir_in_path', opts)
      .then(response => { 
        if (response.ok) { return response.json() }
        else { console.error('Error in fetch') }
      })
      .then(json => {
        window.history.pushState(null, null, new_path_str)
        this.setState({
          items: this.state.items.slice(0, column_i + 1).concat([json]),
          path: new_path_arr,
        })
      })
    }
    else {
      console.log('file descriptipn')

      new_path_arr.concat(clicked_item)
      const new_path_str = new_path_arr.join('/')
      const file_abs_path = new_path_str + '/' + clicked_item
      const opts = {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          'path': file_abs_path,
        })
      } 

      fetch(host + '/file_description', opts)
      .then(response => { 
        if (response.ok) { return response.json() }
        else { console.error('Error in fetch') }
      })
      .then(json => {
        window.history.pushState(null, null, new_path_str)
        this.setState({
          items: this.state.items.slice(0, column_i + 1),
          path: new_path_arr,
          preview: json,
        })
      })
    }



  }

  render() {
    console.log(this.state.items)
    console.log(this.state.path)
    return (
      <div className='app'>
        <div className='dirs'>
          {
            this.state.items.map((dir, i) => {
              return(

                <ul className='dir'>
                  <h4>{i}</h4>
                  <h4>{this.state.path[i]}</h4>
                  {
                    dir.map(item => {
                      if (item.name === this.state.path[i + 1]) {
                        // console.warn('WIN')
                        return (
                          <Item 
                            selected
                            name = {item.name} 
                            type = {item.type}
                          />
                        )
                      }
                      else
                        return ( 
                          <Item
                            onClick = { () => this.select(i, item.name, item.type) }
                            name = {item.name}
                            type = {item.type}
                          />
                        )
                    })
                  }
                </ul>
              )
            })
          }
        </div>
        {
          this.state.preview && 
          <Preview
            abs_path = {this.state.preview.abs_path}
            description = {this.state.preview.description}
          />
        }
      </div>
    )
  }
}

export default App
