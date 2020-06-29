import LipidSim from './lipid-sim';
import Vector2 from './vector-2';

export default class Lipid {
  force: Vector2; // NB assumed to have unit mass so force = acceleration
  velocity: Vector2;
  position: Vector2;

  // The individual forces
  forces: Vector2[] = [];

  constructor(x: number, y: number, angle: number) {
    this.force = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.position = new Vector2(x, y);

    for (let i = 0; i < LipidSim.NUM_FORCES; i++) {
      this.forces[i] = new Vector2(0, 0);
    }
  }

  addForce(index: number, f: Vector2) {
    this.forces[index].x += f.x;
    this.forces[index].y += f.y;
  }

  resetForces() {
    for (let i = 0; i < LipidSim.NUM_FORCES; i++) {
      this.forces[i].x = 0;
      this.forces[i].y = 0;
    }
    this.force.x = 0;
    this.force.y = 0;
  }

  iterate(t: number) {
    // Sum the forces
    for (let i = 0; i < LipidSim.NUM_FORCES; i++) {
      this.force.add(this.forces[i]);
    }

    // update the velocity and position based on the force
    this.velocity.addScaled(this.force, t);
    this.position.addScaled(this.velocity, t);
    this.position.addScaled(this.force, 0.5 * t * t);
  }
}
