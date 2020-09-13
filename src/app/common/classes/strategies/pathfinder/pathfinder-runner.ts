import { PathFinderStrategy } from './pathfinder-strategy';
import { GraphObjectModel, GraphModelColorIndicators } from '../../models/graph.model';

export class PathFinderRunner {
  private stateStack: GraphObjectModel[];
  private statePointer = -1;
  private speed = 1;
  private running = false;
  private started = false;
  private strategy: PathFinderStrategy;
  private iterator: any;

  constructor(private model: GraphObjectModel) {
    this.speed = 1;
  }

  setStrategy(strategy: PathFinderStrategy) {
    this.strategy = strategy;
    this.started = false;
  }

  run() {
    this.init();
    this.running = true;
    this.next();
  }

  init() {
    this.iterator = this.strategy.iterator(this.model);
    this.resetStateStack();
    this.pushStateToStack(this.model);
    this.started = true;
  }

  next() {
    if (!this.hasStarted()) {
      this.init();
    }

    setTimeout(() => {
      if (this.statePointer < this.stateStack.length - 1) {
        const record = this.stateStack[++this.statePointer];
        this.model.setNodeMatrix(this.getCopyOfMatrix(record));
        this.next();
      } else {
        const state = this.iterator.next();
        this.pushStateToStack(state.value);
        if (this.running && !state.done) {
          this.next();
        } else if (state.done) {
          this.started = false;
          this.running = false;
        }
      }
    }, this.speed);
  }

  previous() {
    if (this.statePointer > 0) {
      const record = this.stateStack[--this.statePointer];
      this.model.setNodeMatrix(this.getCopyOfMatrix(record));
    }
  }

  stop() {
    this.started = false;
    this.running = false;

    this.model.getNodeMatrix().forEach((row) => {
      row.forEach((node) => {
        node.color = GraphModelColorIndicators.unvisited;
      });
    });
  }

  pause() {
    this.running = false;
  }

  resume() {
    if (this.hasStarted()) {
      this.running = true;
      this.next();
    }
  }

  isRunning() {
    return this.running;
  }

  hasStarted() {
    return this.started;
  }

  private resetStateStack() {
    this.stateStack = [];
    this.statePointer = -1;
  }

  private pushStateToStack(state: GraphObjectModel) {
    const model = new GraphObjectModel(state.getWidth(), state.getHeight());
    model.setNodeMatrix(this.getCopyOfMatrix(state));
    this.stateStack.push(model);
    this.statePointer++;
  }

  private getCopyOfMatrix(state: GraphObjectModel) {
    return state.getNodeMatrix().map(row => {
      return row.map((node) => ({...node}));
    });
  }
}
