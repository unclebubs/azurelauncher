/* eslint-disable react/prefer-es6-class */
/* eslint-disable import/no-unresolved */
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

} from './types'
// import VirtualTourScene from '../scenes/VirtualTourSceneConnector'
import tourDAO from '../dao/TourDAO'
import planDao from '../dao/PlanDAO'
import sceneDAO from '../dao/SceneDAO'

export const fetchVirtualTours = (userId, planId, tourId, preview = false) => async dispatch => {
  try {
    console.log('the tour id is ', tourId)
    const plan = await planDao.loadPlan(userId, planId, preview)
    if (tourId) {
      const tour = await tourDAO.loadTour(userId, planId, tourId, false)
      return dispatch({
        type: FETCH_SINGLE_TOUR_LIST_SUCCESS,
        payload: {
          virtualTours: [tour],
          plan,
          loadError: false,
          userId,
          planId
        }
      })
    } else {
      await tourDAO.loadTours(userId, planId, dispatch, dispatchEntitiesLoaded, dispatchEntityAdded, dispatchEntityUpdated, dispatchEntityRemoved, preview)

      return dispatch({
        type: FETCH_VIRTUAL_TOUR_LIST_SUCCESS,
        payload: {
          virtualTours: [],
          plan,
          loadError: false,
          userId,
          planId
        }
      })
    }
  } catch (error) {
    console.log('Got an error', error)
    return dispatch({
      type: FETCH_VIRTUAL_TOUR_LIST_ERROR
    })
  }
}

const dispatchEntitiesLoaded = (dispatch, tours) => {
  // console.log('In dispatchEntitiesLoaded')
  // dispatch({
  //   type: FETCH_VIRTUAL_TOUR_LIST_SUCCESS,
  //   payload: { virtualTours: tours }
  // })
}

const dispatchEntityAdded = async (dispatch, tour, previousKey) => {
  // load the initialscene for the tour to enable prefetching
  dispatch({
    type: VIRTUAL_TOURS_CHILD_ADDED,
    payload: { addedTour: tour, previousKey }
  })
}

const dispatchEntityUpdated = async (dispatch, tour, previousKey) => {
  // console.log('In dispatchEntityUpdated')

  dispatch({
    type: VIRTUAL_TOURS_CHILD_UPDATED,
    payload: { updatedTour: tour, previousKey }
  })
}

const dispatchEntityRemoved = (dispatch, tour) => {
  // console.log('In dispatchEntityRemoved')
  dispatch({
    type: VIRTUAL_TOURS_CHILD_REMOVED,
    payload: { removedTour: tour }
  })
}

export const fetchScenes = (userId, planId, tourId, preview = false) => async dispatch => {
  try {
    const tour = await tourDAO.loadTour(userId, planId, tourId, preview)
    await sceneDAO.loadScenes(userId, planId, tourId, dispatch, dispatchScenesLoaded, dispatchSceneAdded, dispatchSceneUpdated, dispatchSceneRemoved, preview)

    return dispatch({
      type: FETCH_SCENE_LIST_SUCCESS,
      payload: {
        virtualTours: [],
        loadError: false,
        userId,
        planId,
        tour
      }
    })
  } catch (error) {
    console.log('Got an error', error)
    return dispatch({
      type: FETCH_SCENE_LIST_ERROR
    })
  }
}

const dispatchScenesLoaded = (dispatch, tours) => {
}

const dispatchSceneAdded = async (dispatch, scene, previousSceneKey) => {
  // load the initialscene for the tour to enable prefetching
  dispatch({
    type: SCENE_CHILD_ADDED,
    payload: { addedScene: scene, previousSceneKey }
  })
}

const dispatchSceneUpdated = async (dispatch, scene, previousSceneKey) => {
  // console.log('In dispatchEntityUpdated')

  dispatch({
    type: SCENE_CHILD_UPDATED,
    payload: { updatedScene: scene, previousSceneKey }
  })
}

const dispatchSceneRemoved = (dispatch, scene) => {
  // console.log('In dispatchEntityRemoved')
  dispatch({
    type: SCENE_CHILD_REMOVED,
    payload: { removedScene: scene.id }
  })
}
