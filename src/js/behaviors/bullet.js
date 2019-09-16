import GameManager from '../../engine/gamemanager'
import Behavior from '../../engine/behavior'
import Vector2 from '../../engine/vector2'

class Bullet extends Behavior {
    lifespan = 600
    start = () => {
        this.rigidbody = this.entity.getComponent('RigidBody')
        this.renderer = this.entity.getComponent('Renderer')
        this.time = Date.now()
    }

    update = () => {
        if (this.time + this.lifespan < Date.now()) {
            this.rigidbody.velocity = this.rigidbody.velocity.mult(0.75)
            this.renderer.radius = this.renderer.radius * 0.75
        }
        if (this.rigidbody.velocity.length() < 1) {
            GameManager.destroy(this.entity)
        }
    }
}

export default Bullet
