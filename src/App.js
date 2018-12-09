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
    console.log(path_arr)
    return path_arr
  }

  append_dir(path) {
    const opts = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        'path': window.location.pathname,
      })
    } 
    // console.log(path)
    fetch(host + '/last_dir_in_path', opts)
    .then(response => { 
      if (response.ok) { return response.json() }
      else if (response.status === 404) { window.alert(404) }
    })
    // .then(json => console.log(json))
    .then(json => {
      this.setState({items: [
        ...this.state.items,
        json
      ]})
    })
  }


  select(column_i, clicked_item) {
    // let n = fake_api()
    // console.log(new_selected_item)
    console.log(column_i, clicked_item)
    console.log('new path:', this.state.path.slice(0, column_i + 1))
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
    return (
      <div className='App'>
        <div className='spaces'>
          {
            this.state.items.map((dir, i) => {
              return(

                <ul className='space'>
                  <h1>{i}</h1>
                  <h4>{this.state.path[i]}</h4>
                  {/* <h4>{i === 0 ? this.state.root: this.state.path[i]} */}
                  {
                    dir.map(item => {
                      if (item.name === this.state.path[i]) {
                        return <Item selected />
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
