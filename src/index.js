import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const allTourContainers = Array.from(document.getElementsByClassName('vrTourContainer'))

allTourContainers.forEach(container => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App appContainer={container} />
      </Provider>
    </React.StrictMode>,
    container
  )
})
