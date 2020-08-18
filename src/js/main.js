import * as PIXI from 'pixi.js'
import Engine from '../engine/Engine'
import Entity from '../engine/entity'
import ParticleBehavior from './behaviors/Particle'
import RigidBody from '../engine/behaviors/rigidbody'
import Renderer from '../engine/behaviors/renderer'
import Vector2 from 'vec2'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
new Engine(ctx)

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

class Particle extends Entity {
    constructor(x, y, v, m) {
        super(x, y, [
            new Renderer(m, 'blue'),
            new RigidBody(v, m),
            new ParticleBehavior()
        ])
    }
}

const count = 1000
for (let i = 0; i < count; i++) {
    let v = new Vector2(Math.random() * 4, 0)
    Engine.game.addGameObject(
        new Particle(
            Math.random() * 1000,
            Math.random() * 1000,
            v.rotate(Math.random() * (2 * Math.PI)),
            Math.max(Math.random() * 8, 4)
        )
    )
}

Engine.game.run()
