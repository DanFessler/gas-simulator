import Behavior from '../behavior'
import Vector2 from '../vector2'

const g = 2500

class Renderer extends Behavior {
    constructor(radius, color) {
        super()
        this.radius = radius
        this.color = color
    }

    start() {}

    update = () => {}

    draw = ctx => {
        ctx.fillStyle = `white`
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false)
        ctx.moveTo(0, 0)
        ctx.lineTo(this.radius, 0)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
}

export default Renderer
