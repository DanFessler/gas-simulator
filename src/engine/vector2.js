export default class Vector2 {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    length = () => {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalized = () => {
        let magnitude = this.length()
        return new Vector2(this.x / magnitude, this.y / magnitude)
    }

    mult = factor => {
        return new Vector2(this.x * factor, this.y * factor)
    }

    add = vect => {
        return new Vector2(this.x + vect.x, this.y + vect.y)
    }
}
