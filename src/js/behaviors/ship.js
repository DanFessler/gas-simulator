import GameManager from '../../engine/gamemanager'
import Entity from '../../engine/entity'
import Behavior from '../../engine/behavior'
import Vector2 from '../../engine/vector2'
import Renderer from '../../engine/behaviors/renderer'
import RigidBody from '../../engine/behaviors/rigidbody'
import Bullet from './bullet'

class Ship extends Behavior {
    start = () => {
        this.rigidbody = this.entity.getComponent('RigidBody')
        this.rigidbody.velocity.x = 0
        this.delay = 50
        this.lastShot = Date.now()
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false,
            space: false
        }
        this.burst = false
        addEventListener('keydown', e => {
            if (event.keyCode == 32 && this.burst == false) {
                this.keys.space = true
                this.burst = true
            }
            if (event.keyCode == 40) {
                this.keys.down = true
            }
            if (event.keyCode == 38) {
                this.keys.up = true
            }
            if (event.keyCode == 37) {
                this.keys.left = true
            }
            if (event.keyCode == 39) {
                this.keys.right = true
            }
        })
        addEventListener('keyup', e => {
            if (event.keyCode == 32) {
                this.keys.space = false
                this.burst = false
            }
            if (event.keyCode == 40) {
                this.keys.down = false
            }
            if (event.keyCode == 38) {
                this.keys.up = false
            }
            if (event.keyCode == 37) {
                this.keys.left = false
            }
            if (event.keyCode == 39) {
                this.keys.right = false
            }
        })
    }

    update = () => {
        if (this.keys.space && this.lastShot + this.delay < Date.now()) {
            let bullet = GameManager.addGameObject(
                new Entity(this.entity.position.x, this.entity.position.y, [
                    new Renderer(5, 'green'),
                    new RigidBody(),
                    new Bullet()
                ])
            )
            bullet.getComponent('RigidBody').velocity = new Vector2(
                Math.cos(this.entity.angle + (Math.random() - 0.5) / 10),
                Math.sin(this.entity.angle + (Math.random() - 0.5) / 10)
            )
                .mult(10)
                .add(this.rigidbody.velocity)

            this.lastShot = Date.now()
        }
        if (this.keys.up) {
            let force = 0.1
            this.rigidbody.addForce({
                x: Math.cos(this.entity.angle) * force,
                y: Math.sin(this.entity.angle) * force
            })
        }
        if (this.keys.left) {
            this.entity.angle -= 0.1
        }
        if (this.keys.right) {
            this.entity.angle += 0.1
        }
    }
}

export default Ship
