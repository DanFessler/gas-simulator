export default class GameManager {
    static instance = null

    constructor(ctx) {
        if (!GameManager.instance) {
            GameManager.instance = this
        }
        this.objects = []
        this.ctx = ctx
    }

    static addGameObject(obj, parent) {
        obj.game = GameManager.instance
        if (!parent) GameManager.instance.objects.push(obj)
        else {
            parent.children.push(obj)
        }
        obj.init()
        return obj
    }

    static run() {
        GameManager.instance.objects.forEach(object => {
            object.init()
        })
        GameManager.tick()
    }

    static tick() {
        GameManager.instance.objects.forEach(object => {
            object.update()
        })
        // GameManager.instance.ctx.fillStyle = `rgba(255, 255, 255, 0.02)`
        GameManager.instance.ctx.clearRect(
            0,
            0,
            GameManager.instance.ctx.canvas.width,
            GameManager.instance.ctx.canvas.height
        )
        GameManager.instance.objects.forEach(object => {
            object.draw(GameManager.instance.ctx)
        })
        requestAnimationFrame(GameManager.tick)
    }

    static destroy(target) {
        GameManager.instance.objects = GameManager.instance.objects.filter(
            obj => obj !== target
        )
    }

    static findObjectByType(type) {
        let foundObject = null
        GameManager.instance.objects.forEach(object => {
            object.behaviors.forEach(behavior => {
                if (behavior.constructor.name === type) {
                    foundObject = behavior
                }
            })
        })
        return foundObject
    }
}
