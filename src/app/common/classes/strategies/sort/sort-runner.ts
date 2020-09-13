import { SortStrategy } from './sort-strategy';
import { ArrayObjectModel, ArrayModelColorIndicators } from '../../models/array.model';

export class SortRunner {
  private stateStack: ArrayObjectModel[];
  private statePointer = -1;
  private speed = 1;
  private running = false;
  private started = false;
  private strategy: SortStrategy;
  private iterator: any;

  constructor(private model: ArrayObjectModel) {
    this.speed = 1000 / model.array.length;
  }

  setStrategy(strategy: SortStrategy) {
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
        this.model.array = [ ...record.array ];
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
      this.model.array = [ ...record.array ];
    }
  }

  stop() {
    this.started = false;
    this.running = false;

    this.model.array.forEach((item) => {
      item.color = ArrayModelColorIndicators.unsorted;
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

  private pushStateToStack(state: ArrayObjectModel) {
    this.stateStack.push({
      // create a clone in our stack
      array : state.array.map((item) => ({ ...item }))
    });
    this.statePointer++;
  }
}
