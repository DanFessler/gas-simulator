import Behavior from "../behavior";
import * as PIXI from "pixi.js";
import app from "../pixiApp.js";

const g = 2500;

class RectRenderer extends Behavior {
  constructor(w, h, color) {
    super();
    this.width = w;
    this.height = h;

    this.color = color;
    this.box = new PIXI.Graphics();
    this.box.lineStyle(1, 0x222222);
    this.box.drawRect(0.5, 0.5, w - 1, h - 1);
    app.stage.addChild(this.box);

    this.lid = new PIXI.Graphics();
    this.lid.lineStyle(2, 0xffffff);
    this.lid.moveTo(0.5, 0.5).lineTo(w - 1, 0.5);
    app.stage.addChild(this.lid);

    this.walls = new PIXI.Graphics();
    this.walls.lineStyle(2, 0xffffff);
    this.walls.moveTo(0.5, 0.5).lineTo(0.5, h - 1);
    this.walls.moveTo(w - 1, 0.5).lineTo(w - 1, h - 1);
    app.stage.addChild(this.walls);

    this.floor = new PIXI.Graphics();
    this.floor.lineStyle(2, 0xffffff);
    this.floor.moveTo(0.5, h - 1).lineTo(w - 1, h - 1);
    app.stage.addChild(this.floor);
  }

  start = () => {};

  update = () => {};

  updateRect = () => {
    let w = this.entity.width;
    let h = this.entity.height;

    // this.box = new PIXI.Graphics();
    this.box.clear();
    this.box.lineStyle(1, 0x222222);
    this.box.drawRect(0.5, 0.5, w - 1, h - 1);
    // app.stage.addChild(this.box);

    // this.lid = new PIXI.Graphics();
    this.lid.clear();
    this.lid.lineStyle(2, 0xffffff);
    this.lid.moveTo(0.5, 0.5).lineTo(w - 1, 0.5);
    // app.stage.addChild(this.lid);

    // this.walls = new PIXI.Graphics();
    this.walls.clear();
    this.walls.lineStyle(2, 0xffffff);
    this.walls.moveTo(0.5, 0.5).lineTo(0.5, h - 1);
    this.walls.moveTo(w - 1, 0.5).lineTo(w - 1, h - 1);
    // app.stage.addChild(this.walls);

    // this.floor = new PIXI.Graphics();
    this.floor.clear();
    this.floor.lineStyle(2, 0xffffff);
    this.floor.moveTo(0.5, h - 1).lineTo(w - 1, h - 1);
    // app.stage.addChild(this.floor);
  };

  draw = ctx => {
    // this.div.style.left = `${this.entity.position.x}px`
    // this.div.style.top = `${this.entity.position.y}px`
    this.box.position = this.entity.position;
    this.lid.position = this.entity.position;
    this.walls.position = this.entity.position;
    this.floor.position = this.entity.position;
    // this.box.lineStyle(1, 0x222222);
    // this.box.drawRect(0.5, 0.5, this.width - 1, this.height - 1);
  };
}

export default RectRenderer;
