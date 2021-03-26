import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const allTourContainers = Array.from(document.getElementsByClassName('vrTourContainer'))

allTourContainers.forEach(container => {
  ReactDOM.render(
    <React.StrictMode>
      <App appContainer={container} />
    </React.StrictMode>,
    container
  )
})
