/* eslint-disable react/prefer-es6-class */
/* eslint-disable import/no-unresolved */
import {
  FETCH_VIRTUAL_TOUR_LIST_SUCCESS,
  FETCH_VIRTUAL_TOUR_LIST_ERROR,
  VIRTUAL_TOURS_CHILD_ADDED,
  VIRTUAL_TOURS_CHILD_UPDATED,
  VIRTUAL_TOURS_CHILD_REMOVED

} from './types'
// import VirtualTourScene from '../scenes/VirtualTourSceneConnector'
import tourDAO from '../dao/TourDAO'
import planDao from '../dao/PlanDAO'

export const fetchVirtualTours = (userId, planId, preview = false) => async dispatch => {
  try {
    const plan = await planDao.loadPlan(userId, planId, preview)
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
