import Vector2 from './vector2'
import RigidBody from './behaviors/rigidbody'
import Renderer from './behaviors/renderer'

const TAU = Math.PI * 2

export default class Entity {
    constructor(x, y, behaviors, children) {
        this.parent = null
        this.position = new Vector2(x, y)
        this.angle = 0

        this.game = null

        this.behaviors = []
        if (behaviors && behaviors.length) {
            behaviors.forEach(behavior => {
                behavior.entity = this
                this.behaviors.push(behavior)
                this[behavior.constructor.name] = behavior
            })
        }

        this.children = []
        if (children && children.length) {
            children.forEach(child => {
                child.parent = this
                this.children.push(child)
            })
        }

        Entity.list.push(this)
    }

    init = () => {
        this.behaviors.forEach(behavior => {
            behavior.start()
        })
    }

    update = () => {
        this.behaviors.forEach(behavior => {
            behavior.update()
        })
        this.children.forEach(child => {
            child.update()
        })
    }

    draw = ctx => {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.angle)
        this.behaviors
            .filter(behavior => behavior.draw !== undefined)
            .forEach(behavior => {
                behavior.draw(ctx)
            })
        this.children.forEach(child => {
            child.draw(ctx)
        })
        ctx.restore()
    }

    static list = []
}
