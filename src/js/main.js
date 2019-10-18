import * as PIXI from "pixi.js";
import Engine from "../engine/Engine";
import Entity from "../engine/entity";
import ParticleBehavior from "./behaviors/Particle";
import RigidBody from "../engine/behaviors/rigidbody";
import Renderer from "../engine/behaviors/renderer";
import Vector2 from "vec2";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
new Engine(ctx);

canvas.width = innerWidth;
canvas.height = innerHeight;

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Particle extends Entity {
  constructor(x, y, v) {
    super(x, y, [
      new Renderer(25, "blue"),
      new RigidBody(),
      new ParticleBehavior()
    ]);

    this.RigidBody.velocity = v;
  }
}

const count = 50;
for (let i = 0; i < count; i++) {
  let v = new Vector2(1, 0);
  v.rotate(Math.random() * (2 * Math.PI));
  Engine.game.addGameObject(
    new Particle(Math.random() * 1000, Math.random() * 1000, v)
  );
}

Engine.game.run();
