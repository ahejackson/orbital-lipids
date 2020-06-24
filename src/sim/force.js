export default class Force {
  // the maximum magnitude of the force
  max;

  // minimum magnitude of the force
  min;

  // the radius of the range within which the force maintains the maximum magnitude
  rMax;

  // the radius of the range within which the force mantains the minimum magnitude
  rMin;

  diff;
  rDiff;

  constructor(max, min, rMax, rMin) {
    this.max = max;
    this.min = min;
    this.rMax = rMax;
    this.rMin = rMin;
    this.diff = max - min;
    this.rDiff = rMax - rMin;
  }

  forceMagnitude = (distance) => {
    if (distance <= this.rMax) {
      return this.max;
    } else if (distance >= this.rMin) {
      return this.min;
    } else {
      return this.min + (this.diff * (distance - this.rMax)) / this.rDiff;
    }
  };

  force = (offset, target) => {
    let distance = offset.distance();
    let f = this.forceMagnitude(distance) / distance;
    target.x = offset.x * f;
    target.y = offset.y * f;
    return target;
  };
}
