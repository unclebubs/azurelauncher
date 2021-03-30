import FirebaseDAO from './FirebaseDAO'

const REF_PREFIX = 'scenes'

class SceneDAO extends FirebaseDAO {
  loadScenes = async (
    userId: string,
    planId: string,
    tourId: string,
    dispatch: any,
    dispatchEntitiesLoaded: any,
    dispatchEntityAdded: any,
    dispatchEntityUpdated: any,
    dispatchEntityRemoved: any,
    preview: boolean = false,
  ): Promise<Array<any>> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        const ref = `${REF_PREFIX}/${userId}/${planId}/${tourId}/${preview ? 'pending' : 'published'}`
        resolve(await this.loadEntities({ ref, dispatch, dispatchEntitiesLoaded, dispatchEntityAdded, dispatchEntityUpdated, dispatchEntityRemoved }))
      } catch (error) {
        console.log('error in loadScenes', error)
        reject(error)
      }
    })
  }
}

const sceneDAO = new SceneDAO()
export default sceneDAO
