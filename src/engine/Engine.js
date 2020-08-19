import Collisions from "collisions";
import Vector2 from "vec2";

export default class Engine {
  static game = null;

  constructor(ctx) {
    if (!Engine.game) {
      Engine.game = this;
    }
    this.objects = [];
    this.ctx = ctx;
    this.collisionSystem = new Collisions();
    this.collisions = this.collisionSystem.createResult();
  }

  addGameObject = (obj, parent) => {
    obj.game = this;
    if (!parent) this.objects.push(obj);
    else {
      parent.children.push(obj);
    }
    obj.init();
    return obj;
  };

  run = () => {
    this.objects.forEach(object => {
      object.init();
    });
    this.tick();
  };

  tick = () => {
    // update each game object
    this.objects.forEach(object => {
      object.update();
    });

    let physicsObjects = this.objects.filter(
      object => object.RigidBody !== undefined
    );
    let collidingPairs = [];

    // static collisions
    for (const current of physicsObjects) {
      for (const target of physicsObjects) {
        let distance = this.checkCollision(current, target);

        if (!!distance) {
          // push pairs for later handling
          collidingPairs.push([current, target]);

          // calculate displacement
          let overlap =
            0.5 *
            (distance - current.RigidBody.radius - target.RigidBody.radius);

          // displace current ball away from collision
          current.position.x -=
            (overlap * (current.position.x - target.position.x)) / distance;
          current.position.y -=
            (overlap * (current.position.y - target.position.y)) / distance;

          // displace target ball away from collition
          target.position.x +=
            (overlap * (current.position.x - target.position.x)) / distance;
          target.position.y +=
            (overlap * (current.position.y - target.position.y)) / distance;
        }
      }

      // Gravity
      // current.RigidBody.velocity.y += 0.01
      // let downVec = current.position
      //   .subtract(new Vector2(500, 500), true)
      //   .normalize()
      //   .multiply(-0.01);
      // current.RigidBody.velocity.add(downVec);

      // Friction
      // current.RigidBody.velocity.multiply(0.999)
    }

    // dynamic collisions
    for (const pair of collidingPairs) {
      let b1 = pair[0],
        b2 = pair[1];

      let fDistance = Math.sqrt(
        Math.pow(b1.position.x - b2.position.x, 2) +
          Math.pow(b1.position.y - b2.position.y, 2)
      );

      // Normal
      let nx = (b2.position.x - b1.position.x) / fDistance;
      let ny = (b2.position.y - b1.position.y) / fDistance;

      // Tangent
      let tx = -ny;
      let ty = nx;

      // Dot Product Tangent
      let dpTan1 = b1.RigidBody.velocity.x * tx + b1.RigidBody.velocity.y * ty;
      let dpTan2 = b2.RigidBody.velocity.x * tx + b2.RigidBody.velocity.y * ty;

      // Dot Product Normal
      let dpNorm1 = b1.RigidBody.velocity.x * nx + b1.RigidBody.velocity.y * ny;
      let dpNorm2 = b2.RigidBody.velocity.x * nx + b2.RigidBody.velocity.y * ny;

      // Conservation of momentum in 1D
      let m1 =
        (dpNorm1 * (b1.RigidBody.mass - b2.RigidBody.mass) +
          2.0 * b2.RigidBody.mass * dpNorm2) /
        (b1.RigidBody.mass + b2.RigidBody.mass);
      let m2 =
        (dpNorm2 * (b2.RigidBody.mass - b1.RigidBody.mass) +
          2.0 * b1.RigidBody.mass * dpNorm1) /
        (b1.RigidBody.mass + b2.RigidBody.mass);

      // Update ball velocities
      b1.RigidBody.velocity.x = tx * dpTan1 + nx * m1;
      b1.RigidBody.velocity.y = ty * dpTan1 + ny * m1;
      b2.RigidBody.velocity.x = tx * dpTan2 + nx * m2;
      b2.RigidBody.velocity.y = ty * dpTan2 + ny * m2;

      // // Wikipedia Version - Maths is smarter but same
      // let kx = b1.RigidBody.velocity.x - b2.RigidBody.velocity.x
      // let ky = b1.RigidBody.velocity.y - b2.RigidBody.velocity.y
      // let p =
      //     (2.0 * (nx * kx + ny * ky)) /
      //     (b1.RigidBody.mass + b2.RigidBody.mass)
      // b1.RigidBody.velocity.x =
      //     b1.RigidBody.velocity.x - p * b2.RigidBody.mass * nx
      // b1.RigidBody.velocity.y =
      //     b1.RigidBody.velocity.y - p * b2.RigidBody.mass * ny
      // b2.RigidBody.velocity.x =
      //     b2.RigidBody.velocity.x + p * b1.RigidBody.mass * nx
      // b2.RigidBody.velocity.y =
      //     b2.RigidBody.velocity.y + p * b1.RigidBody.mass * ny
    }

    // draw each renderable game object
    // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.objects.forEach(object => {
      object.draw(this.ctx);
    });

    // loop
    requestAnimationFrame(this.tick);
  };

  destroy = target => {
    this.objects = this.objects.filter(obj => obj !== target);
  };

  findObjectByType = type => {
    let foundObject = null;
    this.objects.forEach(object => {
      object.behaviors.forEach(behavior => {
        if (behavior.constructor.name === type) {
          foundObject = behavior;
        }
      });
    });
    return foundObject;
  };

  checkCollision(ball0, ball1) {
    var dx = ball1.position.x - ball0.position.x,
      dy = ball1.position.y - ball0.position.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    //collision handling code here
    // console.log(ball0.Renderer.radius)
    // console.log(ball1.x)
    if (dist < ball0.RigidBody.radius + ball1.RigidBody.radius) {
      return dist;
    }
    // console.log(false)
    return false;
  }

  checkCollision_old(ball0, ball1) {
    var dx = ball1.x - ball0.x,
      dy = ball1.y - ball0.y,
      dist = Math.sqrt(dx * dx + dy * dy);

    //collision handling code here
    if (dist < ball0.radius + ball1.radius) {
      //calculate angle, sine, and cosine
      var angle = Math.atan2(dy, dx),
        sin = Math.sin(angle),
        cos = Math.cos(angle),
        //rotate ball0's position
        pos0 = { x: 0, y: 0 }, //point
        //rotate ball1's position
        pos1 = rotate(dx, dy, sin, cos, true),
        //rotate ball0's velocity
        vel0 = rotate(ball0.vx, ball0.vy, sin, cos, true),
        //rotate ball1's velocity
        vel1 = rotate(ball1.vx, ball1.vy, sin, cos, true),
        //collision reaction
        vxTotal = vel0.x - vel1.x;
      vel0.x =
        ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) /
        (ball0.mass + ball1.mass);
      vel1.x = vxTotal + vel0.x;

      //update position - to avoid objects becoming stuck together
      var absV = Math.abs(vel0.x) + Math.abs(vel1.x),
        overlap = ball0.radius + ball1.radius - Math.abs(pos0.x - pos1.x);
      pos0.x += (vel0.x / absV) * overlap;
      pos1.x += (vel1.x / absV) * overlap;

      //rotate positions back
      var pos0F = rotate(pos0.x, pos0.y, sin, cos, false),
        pos1F = rotate(pos1.x, pos1.y, sin, cos, false);

      //adjust positions to actual screen positions
      ball1.x = ball0.x + pos1F.x;
      ball1.y = ball0.y + pos1F.y;
      ball0.x = ball0.x + pos0F.x;
      ball0.y = ball0.y + pos0F.y;

      //rotate velocities back
      var vel0F = rotate(vel0.x, vel0.y, sin, cos, false),
        vel1F = rotate(vel1.x, vel1.y, sin, cos, false);
      ball0.vx = vel0F.x;
      ball0.vy = vel0F.y;
      ball1.vx = vel1F.x;
      ball1.vy = vel1F.y;
    }
  }
}

export class Input {}
