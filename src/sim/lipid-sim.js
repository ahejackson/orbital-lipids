import Force from './force';
import Lipid from './lipid';
import Vector2 from './vector-2';

export default class LipidSim {
  static NUM_FORCES = 2;
  static HEAD_RADIUS = 5;
  static TAIL_LENGTH = 30;

  // parameters
  width = 900;
  height = 600;
  numLipids = 100;

  // state
  forces = [];
  lipids = [];
  t = 0;

  constructor() {
    // setup the forces
    this.forces = this.initParameters();

    // add lipids
    for (let i = 0; i < this.numLipids; i++) {
      this.lipids[i] = new Lipid(
        this.width * Math.random(),
        this.height * Math.random(),
        0
      );
    }
  }

  initParameters = () => {
    const forces = [];
    forces[1] = new Force(40, 0.4, 15, 2 * 15);
    forces[2] = new Force(-30, 0, 30, 30 + 0.001);
    return forces;
  };

  // advance the sim one timestep
  iterate = (timestep) => {
    // calculate forces
    const offset = new Vector2(0, 0);
    const target = new Vector2(0, 0);

    // calculate forces
    for (let i = 0; i < this.numLipids; i++) {
      // reset forces
      this.lipids[i].resetForces();

      for (let j = 0; j < this.numLipids; j++) {
        if (i != j) {
          offset.x = this.lipids[j].position.x - this.lipids[i].position.x;
          offset.y = this.lipids[j].position.y - this.lipids[i].position.y;

          this.lipids[i].addForce(1, this.forces[1].force(offset, target));
          this.lipids[i].addForce(2, this.forces[2].force(offset, target));
        }
      }
    }

    // update positions
    for (let i = 0; i < this.numLipids; i++) {
      this.lipids[i].iterate(timestep);
    }

    this.t++;
  };
}
