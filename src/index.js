import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import Editor from './Editor'
import * as serviceWorker from './serviceWorker'

export const host = 'http://localhost:5000'


ReactDOM.render(<App />, document.getElementById('root'))
// ReactDOM.render(<Editor />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
