export default class Vector2 {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add = (v) => {
    this.x += v.x;
    this.y += v.y;
  };

  addScaled = (v, scale) => {
    this.x += scale * v.x;
    this.y += scale * v.y;
  };

  distance = () => {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  };

  distanceSquared = () => {
    return this.x * this.x + this.y * this.y;
  };

  set = (v) => {
    this.x = v.x;
    this.y = v.y;
  };
}
