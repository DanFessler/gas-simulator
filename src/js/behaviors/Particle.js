import Engine from "../../engine/Engine";
import Behavior from "../../engine/behavior";
import Vector2 from "vec2";

class Particle extends Behavior {
  lifespan = 600;
  start = () => {
    this.time = Date.now();
    // this.entity.RigidBody.velocity.set(1, 0)
    console.log("hello");
  };

  update = () => {
    let self = this.entity;
    if (self.position.x < 0) {
      self.position.x = 0;
      self.RigidBody.velocity.multiply(-1, 1);
    }
    if (self.position.x > 1000) {
      self.position.x = 1000;
      self.RigidBody.velocity.multiply(-1, 1);
    }
    if (self.position.y < 0) {
      self.position.y = 0;
      self.RigidBody.velocity.multiply(1, -1);
    }
    if (self.position.y > 1000) {
      self.position.y = 1000;
      self.RigidBody.velocity.multiply(1, -1);
    }
  };
}

export default Particle;
