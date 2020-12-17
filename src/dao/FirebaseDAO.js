/* eslint-disable class-methods-use-this */
/* eslint-disable no-async-promise-executor */
import fbase from '../firebase/firebase'

export default class FirebaseDAO {
  loadEntity = async ({ ref }) => new Promise(async (resolve, reject) => {
    try {
      fbase
        .database()
        .ref(`${ref}`)
        .once('value')
        .then(snapshot => {
          resolve(snapshot.val())
        })
    } catch (error) {
      console.log('Error while retrieving firebase entity', error)
      reject(error)
    }
  })

  loadEntities = async ({ ref, dispatch, dispatchEntitiesLoaded, dispatchEntityAdded, dispatchEntityUpdated, dispatchEntityRemoved }) => new Promise(async (resolve, reject) => {
    try {
      const dbRef = fbase.database().ref(`${ref}`)
      const valueCallBack = dbRef
        .orderByChild('order')
        .on('value', (snapshot) => {
          // console.log('got value ', snapshot.val())
          const entities = snapshot.val() ? Object.values(snapshot.val()) : []
          dispatchEntitiesLoaded(dispatch, entities)
        })

      const childAddedCallback = dbRef
        .orderByChild('order')
        .on('child_added', (snapshot, previousKey) => {
          // console.log('got child_added ', snapshot.val())
          dispatchEntityAdded(dispatch, snapshot.val(), previousKey)
        })
      const childChangedCallback = dbRef
        .orderByChild('order')
        .on('child_changed', (snapshot, previousKey) => {
          dispatchEntityUpdated(dispatch, snapshot.val(), previousKey)
        })
      const childRemovedCallBack = dbRef
        .orderByChild('order')
        .on('child_removed', snapshot => {
          // console.log('child_removed', snapshot.val())
          dispatchEntityRemoved(dispatch, snapshot.val())
        })
      const childMovedCallBack = dbRef
        .orderByChild('order')
        .on('child_moved', (snapshot, previousKey) => {
          // console.log('child_moved', snapshot.val())
          dispatchEntityUpdated(dispatch, snapshot.val(), previousKey)
        })
      resolve({
        dbRef,
        events: [
          { eventType: 'value', event: valueCallBack },
          { eventType: 'child_added', event: childAddedCallback },
          { eventType: 'child_changed', event: childChangedCallback },
          { eventType: 'child_removed', event: childMovedCallBack },
          { eventType: 'child_moved', event: childRemovedCallBack }]
      })
    } catch (error) {
      console.log('Error while retrieving firebase entity', error)
      reject(error)
    }
  })

  loadAllEntities = async (ref) => new Promise(async (resolve, reject) => {
    try {
      fbase
        .database()
        .ref(ref)
        .on('value', (snapshot) => {
          const entities = snapshot.val() ? Object.values(snapshot.val()) : []

          resolve(entities)
        })
    } catch (error) {
      console.log('Error in loadAllEntities', error)
      reject(error)
    }
  })
}
