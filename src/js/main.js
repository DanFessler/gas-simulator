import Engine from '../engine/Engine'
import Entity from '../engine/entity'
import Vector2 from '../engine/vector2'
import shipBehavior from './behaviors/ship'
import RigidBody from '../engine/behaviors/rigidbody'
import Renderer from '../engine/behaviors/renderer'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
new Engine(ctx)

canvas.width = innerWidth
canvas.height = innerHeight

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight
})

let ship = new Entity(
    canvas.width / 2,
    canvas.height / 2,
    [new Renderer(20, 'blue'), new RigidBody(), new shipBehavior()],
    [
        new Entity(-5, -20, [new Renderer(10, 'red')]),
        new Entity(-5, 20, [new Renderer(10, 'red')])
    ]
)

Engine.game.addGameObject(ship)
Engine.game.run()
