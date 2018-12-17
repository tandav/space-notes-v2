import React, { Component } from 'react'
import './App.css'
import { host } from './index'
import Item from './Item'
import Preview from './Preview'

class App extends Component {
  state = {
    root: '/Users/tandav',
    dirs: [],
    dirs_path: undefined,
    // preview: undefined,
    selected_file: undefined, // may exists after dirs_path
  }

  componentDidMount() {
    // console.log(window.location.pathname)
    // this.append_dir(window.location.pathname)
    // console.log(this.append_dir(window.location.pathname))
    this.setState({
      dirs_path: this.path_split(
        this.state.root, window.location.pathname
      )
    }, this.fetch_every_dir)
  }

  fetch_every_dir() {
    const opts = {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        // 'root': this.state.dirs_path[0],
        'path': this.state.dirs_path,
      })
    }
    fetch(host + '/every_dir_in_path', opts)
    .then(response => { if (response.ok) return response.json()})
    .then(json => { this.setState({ dirs: json }) })
  }
  
  path_split(root, path) {
    console.log(root, path)
    let path_arr = []
    path_arr.push(root)
    path_arr = path_arr.concat(path.split(root + '/')[1].split('/'))
    // console.log(path_arr)
    return path_arr
  }

  setState_App(state) { this.setState(state) }

  eval_shell_script(script) {
    let opts = { 
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ script: script })
    }
    return fetch(host + `/shell`, opts)
  }

  select(column_i, clicked_item, type) {
    // let new_path_arr = this.state.path.slice(0, column_i + 1)
    // let new_path_str = new_path_arr.join('/')
    // let new_path_str
    // const url
    // if (type === 'file') {
      // const new_path_str = new_path_arr.join('/')

    // window.history.pushState(null, null, 
      // .concat(clicked_item)
      // this.state.path.slice(0, column_i + 1).join('/')
    // )

    // }
    if (type === 'folder') {
      const path_new = this.state.dirs_path.slice(0, column_i + 1).concat(clicked_item)
      const path_new_str = path_new.join('/')
      window.history.pushState(null, null, path_new_str)

      // new_path_str = new_path_arr.join('/')
      // const new_path_str = 
      // new_path_str += '/' + clicked_item
      const opts = {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 
          'path': path_new_str,
        })
      }

      fetch(host + '/last_dir_in_path', opts)
      .then(response => { if (response.ok) { return response.json() } else { window.alert('Error in fetch' + response.status) }})
      .then(json => {
        this.setState({
          dirs: this.state.dirs.slice(0, column_i + 1).concat([json]),
          dirs_path: path_new,
          selected_file: undefined,
        })
      })
    }

    if (type === 'file') {
      const path_new = this.state.dirs_path.slice(0, column_i + 1)
      const path_new_str = path_new.join('/')
      window.history.pushState(null, null, path_new_str)

      this.setState({
        dirs: this.state.dirs.slice(0, column_i + 1),
        dirs_path: path_new,
        selected_file: clicked_item,
      })


    }



    // console.log(new_path_str)
    // new_path_arr.concat(clicked_item)

 
    // else {
    //   console.log('file descriptipn')

    //   const new_path_str = new_path_arr.join('/')
    //   const file_abs_path = new_path_str + '/' + clicked_item
    //   const opts = {
    //     method: 'post',
    //     headers: { 'content-type': 'application/json' },
    //     body: JSON.stringify({ 
    //       'path': file_abs_path,
    //     })
    //   } 

    //   fetch(host + '/file_description', opts)
    //   .then(response => { 
    //     if (response.ok) { return response.json() }
    //     else { console.error('Error in fetch') }
    //   })
    //   .then(json => {
    //     window.history.pushState(null, null, new_path_str)
    //     this.setState({
    //       items: this.state.items.slice(0, column_i + 1),
    //       path: new_path_arr,
    //       preview: {
    //         'item': file_abs_path,
    //         'data': json,
    //         'type': 'file',
    //       },
    //     })
    //   })
    // }
  }

  make_preview() {
    let preview
    if (this.state.dirs_path) {
      if (this.state.selected_file) {
        preview = <Preview 
          type = 'file'
          abs_path = {this.state.dirs_path.join('/') + '/' + this.state.selected_file}
          eval_shell_script = {this.eval_shell_script}
          setState_App = {state => this.setState_App(state)}
          dirs = {this.state.dirs}
        />
      }
      else {
        preview = <Preview 
          type = 'folder'
          abs_path = {this.state.dirs_path.join('/')}
          eval_shell_script = {this.eval_shell_script}
          setState_App = {state => this.setState_App(state)}
          dirs = {this.state.dirs}
        />
      }
    }
    else {
      preview = <Preview />
    }
    return preview
  }

  render() {

    

    return (
      <div className='app'>
        <div className='dirs'>
          {
            this.state.dirs.map((dir, i) => {
              return(

                <ul className='dir'>
                  <h4>{i}</h4>
                  <h4>{this.state.dirs_path[i]}</h4>
                  {
                    dir.map(item => {
                      if (
                        item.name === this.state.dirs_path[i + 1] || 
                        (this.state.selected_file && (i + 1) === this.state.dirs_path.length && this.state.selected_file === item.name)
                      ) {
                        return (
                          <Item 
                            selected
                            onClick = { () => this.select(i, item.name, item.type) }
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
          {this.make_preview()}
          {/* {
            this.state.preview ?
              <Preview
                type='file'
                abs_path = {this.state.preview.item}
                description = {this.state.preview.data.description}
              />
            :
              <Preview type='folder' />
          } */}
        </div>

      </div>
    )
  }
}

export default App
