/* eslint-disable no-case-declarations */
import {
  FETCH_VIRTUAL_TOUR_LIST_SUCCESS,
  VIRTUAL_TOURS_CHILD_ADDED,
  VIRTUAL_TOURS_CHILD_UPDATED,
  VIRTUAL_TOURS_CHILD_REMOVED
} from '../actions/types'

const INITIAL_STATE = {
  loading: true,
  plan: null,
  tours: []
}

const addToArrayInOrder = (entityArray, entity, previousKey) => {
  const newArray = [...entityArray]
  if (!previousKey) {
    newArray.unshift(entity)
    return newArray
  }
  // remove the current entity if it exists
  const entityIndex = newArray.findIndex((nextEntity) => entity.id === nextEntity.id)
  if (entityIndex !== -1) {
    newArray.splice(entityIndex, 1)
  }
  const previousentityIndex = newArray.findIndex((nextEntity) => nextEntity.id === previousKey)
  if (previousentityIndex !== -1) {
    newArray.splice(previousentityIndex + 1, 0, entity)
  }
  return newArray
}

const updateEntityInArray = (entityArray, entity, previousKey) => {
  const newentityArray = entityArray.filter((nextEntity) => nextEntity.id !== entity.id)
  const previousentityIndex = newentityArray.findIndex((nextEntity) => nextEntity.id === previousKey)
  newentityArray.splice(previousentityIndex + 1, 0, entity)
  return newentityArray
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VIRTUAL_TOUR_LIST_SUCCESS:
      return {
        ...state,
        plan: action.payload.plan,
        loading: false
      }
    case VIRTUAL_TOURS_CHILD_ADDED:
      const { addedTour, previousKey } = action.payload
      const newTours = addToArrayInOrder([...state.tours], addedTour, previousKey)
      return { ...state, tours: newTours }
    case VIRTUAL_TOURS_CHILD_UPDATED:
      const updatedTours = updateEntityInArray([...state.tours], action.payload.updatedTour, action.payload.previousKey)
      return { ...state, tours: updatedTours }
    case VIRTUAL_TOURS_CHILD_REMOVED:
      const { id } = action.payload.removedTour
      const removedTours = [...state.tours].filter((tour) => tour.id !== id)
      return { ...state, tours: removedTours }
    default:
      return state
  }
}
