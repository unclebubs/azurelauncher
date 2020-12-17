import { combineReducers } from 'redux'
import VirtualTourReducer from './VirtualTourReducer'

export default combineReducers({
  tours: VirtualTourReducer
})
