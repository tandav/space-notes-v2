import React, { Component } from 'react'
import './App.css'
import { host } from './index'
import Item from './Item'
import Preview from './Preview'

class App extends Component {
  state = {
    root: '/Users/tandav',
    dirs: [],
    path: undefined,
    preview: undefined,
    last_selected: undefined,
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
    .then(json => { this.setState({ 
      dirs: json,
      last_selected: {
        'abs_path': window.location.pathname,
        'type': 'folder',
      }
    }) })
  }

  path_split(root, path) {
    console.log(root, path)
    let path_arr = []
    path_arr.push(root)
    path_arr = path_arr.concat(path.split(root + '/')[1].split('/'))
    // console.log(path_arr)
    return path_arr
  }




  // select(column_i, clicked_item, type) {
  //   let new_path_arr = this.state.path.slice(0, column_i + 1)
  //   if (type === 'folder') {

  //     new_path_arr = new_path_arr.concat(clicked_item)
  //     const new_path_str = new_path_arr.join('/')

  //     const opts = {
  //       method: 'post',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({ 
  //         'path': new_path_str,
  //       })
  //     } 

  //     fetch(host + '/last_dir_in_path', opts)
  //     .then(response => { 
  //       if (response.ok) { return response.json() }
  //       else { console.error('Error in fetch') }
  //     })
  //     .then(json => {
  //       window.history.pushState(null, null, new_path_str)
  //       this.setState({
  //         items: this.state.items.slice(0, column_i + 1).concat([json]),
  //         path: new_path_arr,
  //         preview: {
  //           'item': new_path_str,
  //           'type': 'folder',
  //         },
  //       })
  //     })
  //   }
  //   else {
  //     console.log('file descriptipn')

  //     new_path_arr.concat(clicked_item)
  //     const new_path_str = new_path_arr.join('/')
  //     const file_abs_path = new_path_str + '/' + clicked_item
  //     const opts = {
  //       method: 'post',
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({ 
  //         'path': file_abs_path,
  //       })
  //     } 

  //     fetch(host + '/file_description', opts)
  //     .then(response => { 
  //       if (response.ok) { return response.json() }
  //       else { console.error('Error in fetch') }
  //     })
  //     .then(json => {
  //       window.history.pushState(null, null, new_path_str)
  //       this.setState({
  //         items: this.state.items.slice(0, column_i + 1),
  //         path: new_path_arr,
  //         preview: {
  //           'item': file_abs_path,
  //           'data': json,
  //           'type': 'file',
  //         },
  //       })
  //     })
  //   }
  // }

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
      const path_new = this.state.path.slice(0, column_i + 1).concat(clicked_item)
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
          path: path_new,
          last_selected: {
            'abs_path': path_new_str,
            'type': type,
          }
        })
      })
    }

    if (type === 'file') {
      const path_new = this.state.path.slice(0, column_i + 1)
      const path_new_str = path_new.join('/')
      window.history.pushState(null, null, path_new_str)

      this.setState({
        dirs: this.state.dirs.slice(0, column_i + 1),
        path: path_new,
        last_selected: {
          'abs_path': path_new_str + '/' + clicked_item,
          'type': type,
        }
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

  render() {
    console.log(this.state.items)
    console.log(this.state.path)
    return (
      <div className='app'>
        <div className='dirs'>
          {
            this.state.dirs.map((dir, i) => {
              return(

                <ul className='dir'>
                  <h4>{i}</h4>
                  <h4>{this.state.path[i]}</h4>
                  {
                    dir.map(item => {
                      if (
                        item.name === this.state.path[i + 1] || 
                        (this.state.last_selected && this.state.path.join('/') + '/' + item.name === this.state.last_selected.abs_path)
                      ) {
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
          {
            this.state.last_selected &&
            <Preview 
              type = {this.state.last_selected.type}
              abs_path = {this.state.last_selected.abs_path}
            />
          }
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
