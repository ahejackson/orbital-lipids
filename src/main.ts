import Lipid from './sim/lipid';
import LipidSim from './sim/lipid-sim';

const forceColors = ['blue', 'red'];
const timestep = 0.1;

let showTails = false;
let showForces = true;
let showTotalForces = true;
let running = false;

// Draw the current state of the simulation
const drawSim = (context: CanvasRenderingContext2D, sim: LipidSim) => {
  context.fillStyle = 'lightgray';
  context.fillRect(0, 0, sim.WIDTH, sim.HEIGHT);

  drawIterations(context, sim);
  sim.lipids.forEach((lipid) => drawLipid(context, lipid));
};

const drawLipid = (context: CanvasRenderingContext2D, lipid: Lipid) => {
  context.beginPath();
  context.arc(
    lipid.position.x,
    lipid.position.y,
    LipidSim.HEAD_RADIUS,
    0,
    2 * Math.PI
  );
  context.fillStyle = 'red';
  context.fill();
  context.strokeStyle = 'gray';
  context.stroke();

  // If we were drawing the tails...
  if (showTails) {
    context.beginPath();
    context.moveTo(lipid.head.x, lipid.head.y);
    context.lineTo(lipid.tail.x, lipid.tail.y);
    context.stroke();
  }

  if (showForces) {
    for (let i = 0; i < LipidSim.NUM_FORCES; i++) {
      context.beginPath();
      context.moveTo(lipid.position.x, lipid.position.y);
      context.lineTo(
        lipid.position.x + lipid.forces[i].x,
        lipid.position.y + lipid.forces[i].y
      );
      context.strokeStyle = forceColors[i];
      context.stroke();
    }
  }

  if (showTotalForces) {
    context.beginPath();
    context.moveTo(lipid.position.x, lipid.position.y);
    context.lineTo(
      lipid.position.x + lipid.force.x,
      lipid.position.y + lipid.force.y
    );
    context.strokeStyle = 'white';
    context.stroke();
  }
};

const drawIterations = (context: CanvasRenderingContext2D, sim: LipidSim) => {
  context.fillStyle = 'black';
  context.font = '16px Helvetica';
  context.fillText(`t = ${sim.t}`, 20, 20);
};

const updateAndRender = () => {
  sim.iterate(timestep);
  drawSim(ctx, sim);

  if (running) {
    window.requestAnimationFrame(updateAndRender);
  }
};

// Setup keyboard controls
document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    running = !running;

    if (running) {
      window.requestAnimationFrame(updateAndRender);
    }
  }

  if (event.code === 'Digit1') {
    showTails = !showTails;
    window.requestAnimationFrame(() => drawSim(ctx, sim));
  }

  if (event.code === 'Digit2') {
    showForces = !showForces;
    window.requestAnimationFrame(() => drawSim(ctx, sim));
  }

  if (event.code === 'Digit3') {
    showTotalForces = !showTotalForces;
    window.requestAnimationFrame(() => drawSim(ctx, sim));
  }

  if (event.code === 'KeyF') {
    sim.iterate(timestep);
    drawSim(ctx, sim);
  }
});

// Get references to the canvas
const canvas = document.getElementById(
  'awesome-simple-lipids'
)! as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

// Create the sim
const sim = new LipidSim();
drawSim(ctx, sim);
