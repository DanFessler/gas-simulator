import * as PIXI from "pixi.js";
import app from "../engine/pixiApp.js";
import Engine from "../engine/Engine";
import Entity from "../engine/entity";
import ParticleBehavior from "./behaviors/Particle";
import ContainerBehavior from "./behaviors/Container";
import RigidBody from "../engine/behaviors/rigidbody";
import Renderer from "../engine/behaviors/renderer";
import RectRenderer from "../engine/behaviors/RectRenderer";
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
  constructor(x, y, v, m) {
    super(x, y, [
      new Renderer(m, "blue"),
      new RigidBody(v, m),
      new ParticleBehavior()
    ]);
    this.radius = m;
  }
}

class Container extends Entity {
  constructor(x, y, w, h) {
    super(x, y, [new RectRenderer(w, h, "red"), new ContainerBehavior()]);
    this.width = w;
    this.height = h;
  }
}

class ParticleManager extends Entity {
  particles = [];
  container = null;
  containerCollision = true;
  floorCollision = false;
  gravity = true;

  constructor(count) {
    super();
    this.container = Engine.game.addGameObject(
      new Container(100, 100, 1000, 1000)
    );

    // this.container.RectRenderer.walls.visible = false;

    for (let i = 0; i < count / 2; i++) {
      let v = new Vector2(Math.random() * 4, 0);
      v.rotate(Math.random() * (2 * Math.PI));
      let m = 4;

      let particle = Engine.game.addGameObject(
        new Entity(
          Math.random() * this.container.width + this.container.position.x,
          (Math.random() * this.container.height) / 2 +
            this.container.position.y +
            this.container.height / 2,
          [new Renderer(m, 0xff0000), new RigidBody(v, m)]
        )
      );
      particle.radius = m;

      this.particles.push(particle);
    }

    for (let i = 0; i < count / 2; i++) {
      let v = new Vector2(Math.random() * 4, 0);
      v.rotate(Math.random() * (2 * Math.PI));
      let m = 4;

      let particle = Engine.game.addGameObject(
        new Entity(
          Math.random() * this.container.width + this.container.position.x,
          (Math.random() * this.container.height) / 2 +
            this.container.position.y +
            this.container.height / 2,
          [new Renderer(m, 0x0000ff), new RigidBody(v, m, 25)]
        )
      );
      particle.radius = m;

      this.particles.push(particle);
    }
  }

  update = () => {
    // console.log(this.particles);
    let avgVel = 0;
    for (const particle of this.particles) {
      // // Central Gravity
      // let downVec = particle.position
      //   .subtract(new Vector2(500, 500), true)
      //   .normalize()
      //   .multiply(-0.1);

      // Downward Gravity
      let downVec = new Vector2(0, 0.02);

      if (this.gravity) particle.RigidBody.velocity.add(downVec);

      // particle.position.x = this.mod(particle.position.x, 1000)
      if (this.containerCollision) {
        if (particle.position.x < this.container.position.x + particle.radius) {
          particle.position.x = this.container.position.x + particle.radius;
          particle.RigidBody.velocity.multiply(-1, 1);
        }
        if (
          particle.position.x >
          this.container.position.x + this.container.width - particle.radius
        ) {
          particle.position.x =
            this.container.position.x + this.container.width - particle.radius;
          particle.RigidBody.velocity.multiply(-1, 1);
        }
        if (particle.position.y < this.container.position.y + particle.radius) {
          particle.position.y = this.container.position.y + particle.radius;
          particle.RigidBody.velocity.multiply(1, -1);
        }
        if (
          particle.position.y >
          this.container.position.y + this.container.height - particle.radius
        ) {
          particle.position.y =
            this.container.position.y + this.container.height - particle.radius;
          particle.RigidBody.velocity.multiply(1, -1);
        }
      }

      if (this.floorCollision) {
        // console.log(app.height);
        if (particle.position.y + particle.radius > app.renderer.height) {
          particle.position.y = app.renderer.height - particle.radius;
          particle.RigidBody.velocity.multiply(1, -1);
        }
      }

      avgVel += particle.RigidBody.velocity.length();
    }
    console.log(avgVel / this.particles.length);
  };

  mod = (a, b) => ((a % b) + b) % b;
}

Engine.game.addGameObject(new ParticleManager(500));

Engine.game.run();
