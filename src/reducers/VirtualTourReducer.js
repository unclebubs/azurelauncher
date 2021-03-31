/* eslint-disable no-case-declarations */
import {
  FETCH_VIRTUAL_TOUR_LIST_SUCCESS,
  FETCH_VIRTUAL_TOUR_LIST_ERROR,
  VIRTUAL_TOURS_CHILD_ADDED,
  VIRTUAL_TOURS_CHILD_UPDATED,
  VIRTUAL_TOURS_CHILD_REMOVED,
  FETCH_SINGLE_TOUR_LIST_SUCCESS,
  FETCH_SCENE_LIST_SUCCESS,
  FETCH_SCENE_LIST_ERROR,
  SCENE_CHILD_ADDED,
  SCENE_CHILD_UPDATED,
  SCENE_CHILD_REMOVED
} from '../actions/types'
import Tour from '../model/Tour'

const INITIAL_STATE = {
  loading: true,
  loadingError: false,
  plan: null,
  tours: [],
  tour: new Tour(),
  scenes: []
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
    case FETCH_SINGLE_TOUR_LIST_SUCCESS:
      return {
        ...state,
        plan: action.payload.plan,
        loading: false,
        tours: action.payload.virtualTours
      }
    case FETCH_VIRTUAL_TOUR_LIST_SUCCESS:
      return {
        ...state,
        plan: action.payload.plan,
        loading: false
      }
    case FETCH_VIRTUAL_TOUR_LIST_ERROR:
      return {
        ...state,
        plan: null,
        loading: false,
        loadingError: true
      }
    case VIRTUAL_TOURS_CHILD_ADDED:
      const { addedTour, previousKey } = action.payload
      const newTours = addToArrayInOrder([...state.tours], addedTour, previousKey)
      return { ...state, tours: newTours, loading: false, loadingError: false }
    case VIRTUAL_TOURS_CHILD_UPDATED:
      const updatedTours = updateEntityInArray([...state.tours], action.payload.updatedTour, action.payload.previousKey)
      return { ...state, tours: updatedTours, loading: false, loadingError: false }
    case VIRTUAL_TOURS_CHILD_REMOVED:
      const { id } = action.payload.removedTour
      const removedTours = [...state.tours].filter((tour) => tour.id !== id)
      return { ...state, tours: removedTours, loading: false, loadingError: false }
    case FETCH_SCENE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tour: action.payload.tour
      }
    case FETCH_SCENE_LIST_ERROR:
      return {
        ...state,
        scenes: [],
        loading: false,
        loadingError: true
      }
    case SCENE_CHILD_ADDED:
      const { addedScene, previousSceneKey } = action.payload
      const newScenes = addToArrayInOrder([...state.scenes], addedScene, previousSceneKey)
      return { ...state, scenes: newScenes, loading: false, loadingError: false }
    case SCENE_CHILD_UPDATED:
      const updatedScenes = updateEntityInArray([...state.scenes], action.payload.updatedScene, action.payload.previousSceneKey)
      return { ...state, scenes: updatedScenes, loading: false, loadingError: false }
    case SCENE_CHILD_REMOVED:
      const sceneId = action.payload.removedScene
      const removedScenes = [...state.scenes].filter((scene) => scene.id !== sceneId)
      return { ...state, scenes: removedScenes, loading: false, loadingError: false }
    default:
      return state
  }
}
