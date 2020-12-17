class Plan {
    id: string
    userId: string
    name: string
    description: string
    subscriptionId: string
    order: number
    image: string

    constructor (id: string, userId: string, name = '', description = '', subscriptionId = '', order = 0, image = '') {
      this.id = id
      this.userId = userId
      this.name = name
      this.description = description
      this.subscriptionId = subscriptionId
      this.order = order
      this.image = image
    }
}
export default Plan
