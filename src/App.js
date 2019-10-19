import React, { useState, useEffect } from 'react'
import './App.css'
import { host } from './index'
import Item from './Item'
import Preview from './Preview'
import * as util from './util'

const App = () => {
  const [selected_item, set_selected_item] = useState() // selected here means in the last column/folder (with preview)
  const [dirs, set_dirs] = useState([])
  const [path, set_path] = useState([])
  const downloads_url = 'http://localhost:5000/last_dir_in_path/Downloads'

  useEffect(() => {
    const fetch_dirs = async () => {
      const data = await util.fetch_json(host + '/path' + window.location.pathname)
      set_dirs(data.dirs)
      set_path(data.path)
    }
    fetch_dirs()
  }, [])

  // const fetch_downloads = async () => {
  //   const response = await fetch(downloads_url)
  //   const data = await response.text()
  //   set_dirs(data)
  // }

  const select_item = async (column_i, item) => {
    if (item.type === 'folder') {
      // set_dirs(dirs.slice(0, column_i + 1).concat(item_name))
      // set_dirs_path(dirs_path.slice(0, column_i + 1).concat(item_name))
      const path_new = path.slice(0, column_i + 1).concat(item.name)
      // const path_new_str = path_new.slice(1).join('/')
      const path_new_str = path_new.join('/')
      console.log(path_new, path_new_str)
      window.history.pushState(null, null, path_new_str)
      const data = await util.fetch_json(host + '/last_dir_in_path/' + path_new.slice(1).join('/'))
      set_dirs(dirs.slice(0, column_i + 1).concat([data]))
      set_path(path.slice(0, column_i + 1).concat(item.name))
      set_selected_item(undefined)
    }

    if (item.type === 'file') {
      // TODO: add filename to url (link to file)
      const path_new = path.slice(0, column_i + 1)
      const path_new_str = path_new.join('/')
      window.history.pushState(null, null, path_new_str)
      set_dirs(dirs.slice(0, column_i + 1))
      set_path(path.slice(0, column_i + 1))
      set_selected_item(item)
    }

  }

  return (
    <div className='app'>
      {
        dirs.map((dir, i) => { return (
          <ul key = {i} className='dir'>
            {/* <h4>{i}</h4> */}
            <h4 className='dir_head'>{path[i]}</h4>
            {
              // dir.map(item => <Item name = {item.name} type = {item.type} />)
              dir.map((item, j) => {
                const is_item_selected = selected_item && (i + 1) === path.length && selected_item === item.name
                console.log(is_item_selected)
                // if (
                //    //|| 
                //   // (this.state.selected_file && (i + 1) === this.state.dirs_path.length && this.state.selected_file === item.name)
                // ) {
                return (
                  <Item 
                    // key = {j}
                    key = {item.name}
                    selected={ item.name === path[i + 1] || is_item_selected }
                    // onClick = { () => select_item(i, item.name, item.type) }
                    onClick = { () => select_item(i, item) }
                    name = {item.name} 
                    type = {item.type}
                  />
                )
                // }
                // else
                  // return (
                  //   <Item
                  //     key = {j}
                  //     // onClick = { () => this.select(i, item.name, item.type) }
                  //     name = {item.name}
                  //     type = {item.type}
                  //   />
                  // )
              })
            }
          </ul>
        )})
      }
      {selected_item && <Preview item = {selected_item} />}
      {/* <button onClick = {fetch_downloads}>Fetch ~/Downloads</button> */}
    </div>
  )
}

export default App
