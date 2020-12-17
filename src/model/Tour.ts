class Tour {
    id: string
    userId: string
    planId: string
    name: string
    description: string
    image: string
    initialScene: string
    order: number

    constructor (id: string, userId: string, planId = '', name = '', description = '', image = '', initialScene = '', order = 0) {
      this.id = id
      this.userId = userId
      this.planId = planId
      this.name = name
      this.description = description
      this.image = image
      this.initialScene = initialScene
      this.order = order
    }
}
export default Tour
