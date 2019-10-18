import Collisions from "collisions";

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

    // resolve collisions
    console.log(this.objects.filter(object => object.RigidBody !== undefined));
    this.objects
      .filter(object => object.RigidBody !== undefined)
      .forEach(object => {
        let subject = object.RigidBody.collision;
        const potentials = subject.potentials();

        // Loop through the potential collisions
        for (const collision of potentials) {
          if (subject.collides(collision, this.collisions)) {
            subject.x -= this.collisions.overlap * this.collisions.overlap_x;
            subject.y -= this.collisions.overlap * this.collisions.overlap_y;
            object.position.x = subject.x;
            object.position.y = subject.y;
          }
        }
      });

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
