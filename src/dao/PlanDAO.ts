/* eslint-disable no-async-promise-executor */
/* eslint-disable no-invalid-this */
import FirebaseDAO from './FirebaseDAO'
import Plan from '../model/Plan'

declare module './FirebaseDAO' {
  export interface FirebaseDAO {
      loadEntity(): any;
  }
}

const REF_PREFIX = 'plans'

class PlanDAO extends FirebaseDAO {
  // eslint-disable-next-line no-async-promise-executor
  loadPlan = async (uId: string, planId: string, preview: boolean = false) : Promise<Plan> => new Promise(async (resolve, reject) => {
    try {
      const ref = await this.buildRef(uId, planId, preview)
      const planData = await this.loadEntity({ ref })
      if (planData) {
        const { id, userId, name, description, subscriptionId, order, image } = planData
        // const plan: Plan = new Plan(id, name, description, subscriptionId, order, image)
        resolve({ id, userId, name, description, subscriptionId, order, image })
      }
      throw new Error('No plan found')
    } catch (error) {
      reject(error)
    }
  })

  buildRef = async (userId: string, planId: string, preview: boolean = false) : Promise<string> => new Promise(async (resolve, reject) => {
    try {
      const ref = `${REF_PREFIX}/${userId}/${preview ? 'pending' : 'published'}/${planId || ''}`
      resolve(ref)
    } catch (error) {
      reject(error)
    }
  })
}

const planDAO = new PlanDAO()

export default planDAO
