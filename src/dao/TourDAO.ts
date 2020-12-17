/* eslint-disable import/no-unresolved */
/* eslint-disable no-invalid-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-async-promise-executor */
import FirebaseDAO from './FirebaseDAO'
import Tour from '../model/Tour'

const REF_PREFIX = 'virtualTours'

class TourDAO extends FirebaseDAO {
  loadTour = async (uId: string, planIdx: string, tourId: string) : Promise<Tour> => new Promise(async (resolve, reject) => {
    try {
      const ref: string = await this.buildRef(uId, planIdx, tourId)
      const tourData = await this.loadEntity({ ref })
      const { id, userId, planId, name, description, image, initialScene, order } = tourData
      const tour: Tour = new Tour(id, userId, planId, name, description, image, initialScene, order)
      resolve(tour)
    } catch (error) {
      reject(error)
    }
  })

  loadTours = async (userId: string, planId: string, dispatch: any, dispatchEntitiesLoaded: any, dispatchEntityAdded: any, dispatchEntityUpdated: any, dispatchEntityRemoved: any) : Promise<string> => new Promise(async (resolve, reject) => {
    try {
      const ref = `${REF_PREFIX}/${userId}/${planId}/published`
      resolve(await this.loadEntities({ ref, dispatch, dispatchEntitiesLoaded, dispatchEntityAdded, dispatchEntityUpdated, dispatchEntityRemoved }))
    } catch (error) {
      console.log('Caught an error in TourDAO @ loadtours', error)
      reject(error)
    }
  })

  loadAllTours = async (userId: string, planId: string) : Promise<string> => new Promise(async (resolve, reject) => {
    try {
      const ref = `${REF_PREFIX}/${userId}/${planId}/published`
      resolve(await this.loadAllEntities(ref))
    } catch (error) {
      console.log('Caught an error in TourDAO @ loadtours', error)
      reject(error)
    }
  })

  buildRef = async (userId: string, planId: string, tourId: string) : Promise<string> => new Promise(async (resolve, reject) => {
    try {
      const ref = `${REF_PREFIX}/${userId}/${planId}/published/${tourId}`
      resolve(ref)
    } catch (error) {
      reject(error)
    }
  })
}
const toudDAO = new TourDAO()
export default toudDAO
