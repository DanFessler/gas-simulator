import Engine from "../../engine/Engine";
import Behavior from "../../engine/behavior";
import Vector2 from "vec2";

class MouseInput {
  button = null;
  x = 0;
  y = 0;
  constructor() {
    window.addEventListener("mousedown", e => {
      this.button = e.button;
      this.x = e.clientX;
      this.y = e.clientY;
    });
    window.addEventListener("mouseup", e => {
      this.button = null;
      this.x = e.clientX;
      this.y = e.clientY;
    });
    window.addEventListener("mousemove", e => {
      this.x = e.clientX;
      this.y = e.clientY;
    });
  }
}

const mouse = new MouseInput();

class Container extends Behavior {
  lifespan = 600;

  constructor() {
    super();
    this.dragging = false;
  }

  start = () => {
    this.time = Date.now();
    // this.entity.RigidBody.velocity.set(1, 0)
    // console.log("hello");
  };

  update = () => {
    if (mouse.button !== null && !this.dragging) {
      let d = Math.sqrt(
        Math.pow(this.entity.position.x + this.entity.width - mouse.x, 2) +
          Math.pow(this.entity.position.y + this.entity.height - mouse.y, 2)
      );
      if (d < 10) {
        console.log("DRAG");
        this.dragging = true;
      }
    }
    if (mouse.button === null && this.dragging) {
      this.dragging = false;
    }

    if (this.dragging) {
      this.entity.width = mouse.x - this.entity.position.x;
      this.entity.height = mouse.y - this.entity.position.y;
      this.entity.RectRenderer.updateRect();
    }
  };

  mod = (a, b) => ((a % b) + b) % b;
}

export default Container;
