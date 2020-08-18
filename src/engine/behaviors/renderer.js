import Behavior from "../behavior";
import * as PIXI from "pixi.js";
import app from "../pixiApp.js";

const g = 2500;

class Renderer extends Behavior {
  constructor(radius, color) {
    super();
    this.radius = radius;
    this.color = color;
    this.graphics = new PIXI.Graphics();
    // this.graphics.lineStyle(1, 0xffffff)
    this.graphics.beginFill(color);
    this.graphics.drawCircle(0, 0, radius);
    this.graphics.endFill();
    app.stage.addChild(this.graphics);
  }

  start = () => {};

  update = () => {};

  draw = ctx => {
    // this.div.style.left = `${this.entity.position.x}px`
    // this.div.style.top = `${this.entity.position.y}px`
    this.graphics.position.x = this.entity.position.x;
    this.graphics.position.y = this.entity.position.y;
  };
}

export default Renderer;
