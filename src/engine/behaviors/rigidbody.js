import Behavior from '../behavior'
import Vector2 from '../vector2'

const g = 2500

class RigidBody extends Behavior {
    velocity = new Vector2(0, 0)
    angularVelocity = 0

    start() {}

    update = () => {
        let entity = this.entity
        entity.position.x += this.velocity.x
        entity.position.y += this.velocity.y
        entity.angle += this.angularVelocity
    }

    addForce = v => {
        this.velocity.x += v.x
        this.velocity.y += v.y
    }
}

export default RigidBody
