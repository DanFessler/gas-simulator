import Behavior from '../behavior'
import Vector2 from 'vec2'
import Collisions from 'collisions'

const g = 2500

class RigidBody extends Behavior {
    velocity = new Vector2(0, 0)
    angularVelocity = 0

    constructor(v, r, m) {
        super()
        this.velocity = v
        this.radius = r
        this.mass = m ? m : r
    }

    start = () => {
        this.collision = this.entity.game.collisionSystem.createCircle(
            0,
            0,
            this.entity.Renderer.radius
        )
    }

    update = () => {
        let entity = this.entity
        entity.position.x += this.velocity.x
        entity.position.y += this.velocity.y
        this.collision.x = entity.position.x
        this.collision.y = entity.position.y
        entity.angle += this.angularVelocity
    }

    addForce = v => {
        this.velocity.x += v.x
        this.velocity.y += v.y
    }
}

export default RigidBody
