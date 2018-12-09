import React, { Component } from 'react'
import './App.css'
import { host } from './index'
import Item from './Item'

class App extends Component {
  state = {
    root: '/Users/tandav',
    items: [],
    path: undefined,
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

  append_dir(path) {

  }


  select(column_i, clicked_item) {
    // let n = fake_api()
    // console.log(new_selected_item)
    const new_path_arr = this.state.path.slice(0, column_i + 1).concat(clicked_item)
    const new_path_str = new_path_arr.join('/')
    // console.log(column_i, clicked_item)
    // console.warn(new_path_arr)

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
    // .then(json => console.log(json))
    .then(json => {
      window.history.pushState(null, null, new_path_str)
      this.setState({
        items: this.state.items.slice(0, column_i + 1).concat([json]),
        path: new_path_arr,
      })
    })

    // console.log('new path:', new_path)
    // console.log('new path:', new_path.join('/'))
    // const new_path = window.location.pathname + '/' + new_selected_item
    // window.history.pushState(null, null, new_path)
    // window.history.pushState(null, null, window.location.pathname + '/' + new_selected_item)
    // window.location.pathname += '/' + new_selected_item
    // this.append_dir(window.location.pathname)

    // this.setState(prevState => {
    //   let z = prevState.path.slice(0, column_i + 1)
    //   z[z.length - 1] = new_selected_item
    //   // console.log(z)

    //   // console.log([...prevState.selected.slice(0, column_i - 1), new_selected_item])
    //   return { path: z }
    // })
    // this.state.path[column_i] = new_selected_item
    // this
    // console.log(1)
    // window.alert(n)
  }

  render() {
    console.log(this.state.items)
    console.log(this.state.path)
    return (
      <div className='App'>
        <div className='spaces'>
          {
            this.state.items.map((dir, i) => {
              return(

                <ul className='space'>
                  <h1>{i}</h1>
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
                            onClick = { () => this.select(i, item.name) }
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
      </div>
    )
  }
}

export default App
