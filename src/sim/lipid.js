import LipidSim from './lipid-sim';
import Vector2 from './vector-2';

export default class Lipid {
  force; // NB assumed to have unit mass so force = acceleration
  velocity;
  position;

  forces;

  angle;

  head;
  tail;

  constructor(x, y, angle) {
    this.force = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.position = new Vector2(x, y);

    this.angle = angle;

    this.forces = [];
    for (let i = 1; i < LipidSim.NUM_FORCES + 1; i++) {
      this.forces[i] = new Vector2(0, 0);
    }

    this.head = new Vector2(x, y);
    this.tail = new Vector2(
      x + (LipidSim.HEAD_RADIUS + LipidSim.TAIL_LENGTH) * Math.cos(angle),
      y + (LipidSim.HEAD_RADIUS + LipidSim.TAIL_LENGTH) * Math.sin(angle)
    );
  }

  addForce = (index, f) => {
    this.forces[index].x += f.x;
    this.forces[index].y += f.y;
  };

  resetForces = () => {
    for (let i = 1; i <= LipidSim.NUM_FORCES; i++) {
      this.forces[i].x = 0;
      this.forces[i].y = 0;
    }
    this.force.x = 0;
    this.force.y = 0;
  };

  iterate = (t) => {
    //this.angle += 0.01;

    for (let i = 1; i <= LipidSim.NUM_FORCES; i++) {
      this.force.add(this.forces[i]);
    }

    this.velocity.addScaled(this.force, t);
    this.position.addScaled(this.velocity, t);
    this.position.addScaled(this.force, 0.5 * t * t);

    this.head.set(this.position);
    this.tail.x =
      this.head.x +
      (LipidSim.HEAD_RADIUS + LipidSim.TAIL_LENGTH) * Math.cos(this.angle);
    this.tail.y =
      this.head.y +
      (LipidSim.HEAD_RADIUS + LipidSim.TAIL_LENGTH) * Math.sin(this.angle);
  };
}
