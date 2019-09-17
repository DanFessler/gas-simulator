import Engine from '../../engine/Engine'
import Entity from '../../engine/entity'
import Behavior from '../../engine/behavior'
import Vector2 from '../../engine/vector2'
import Renderer from '../../engine/behaviors/renderer'
import RigidBody from '../../engine/behaviors/rigidbody'
import Bullet from './bullet'

class bulletPrefab extends Entity {
    constructor(x, y) {
        super(x, y, [new Renderer(5, 'green'), new RigidBody(), new Bullet()])
    }
}

class Ship extends Behavior {
    start = () => {
        this.entity.RigidBody.velocity.x = 0
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
        let self = this.entity
        if (this.keys.space && this.lastShot + this.delay < Date.now()) {
            this.spawnBullet(
                self.position.x + Math.cos(self.angle) * 20,
                self.position.y + Math.sin(self.angle) * 20,
                self.angle + (Math.random() - 0.5) / 25
            )
            this.spawnBullet(
                self.position.x + Math.cos(self.angle + Math.PI / 2) * 20,
                self.position.y + Math.sin(self.angle + Math.PI / 2) * 20,
                self.angle + 0.1 + (Math.random() - 0.5) / 25
            )
            this.spawnBullet(
                self.position.x + Math.cos(self.angle - Math.PI / 2) * 20,
                self.position.y + Math.sin(self.angle - Math.PI / 2) * 20,
                self.angle - 0.1 + (Math.random() - 0.5) / 25
            )
            this.lastShot = Date.now()
        }
        if (this.keys.up) {
            let force = 0.1
            self.RigidBody.addForce({
                x: Math.cos(self.angle) * force,
                y: Math.sin(self.angle) * force
            })
        }
        if (this.keys.left) {
            self.angle -= 0.1
        }
        if (this.keys.right) {
            self.angle += 0.1
        }
    }

    spawnBullet = (x, y, angle) => {
        let self = this.entity
        let bullet = Engine.game.addGameObject(new bulletPrefab(x, y))

        bullet.RigidBody.velocity = new Vector2(
            Math.cos(angle),
            Math.sin(angle)
        )
            .mult(10)
            .add(self.RigidBody.velocity)
    }
}

export default Ship
