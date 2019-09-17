export default class Engine {
    static game = null

    constructor(ctx) {
        if (!Engine.game) {
            Engine.game = this
        }
        this.objects = []
        this.ctx = ctx
    }

    addGameObject = (obj, parent) => {
        obj.game = this
        if (!parent) this.objects.push(obj)
        else {
            parent.children.push(obj)
        }
        obj.init()
        return obj
    }

    run = () => {
        this.objects.forEach(object => {
            object.init()
        })
        this.tick()
    }

    tick = () => {
        // update each game object
        this.objects.forEach(object => {
            object.update()
        })

        // draw each renderable game object
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        this.objects.forEach(object => {
            object.draw(this.ctx)
        })

        // loop
        requestAnimationFrame(this.tick)
    }

    destroy = target => {
        this.objects = this.objects.filter(obj => obj !== target)
    }

    findObjectByType = type => {
        let foundObject = null
        this.objects.forEach(object => {
            object.behaviors.forEach(behavior => {
                if (behavior.constructor.name === type) {
                    foundObject = behavior
                }
            })
        })
        return foundObject
    }
}

export class Input {}
