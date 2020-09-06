import { SortStrategy } from './sort-strategy';
import { ArrayObjectModel, ArrayModelColorIndicators } from '../models/array.model';

export class SortRunner {
  private stateStack: ArrayObjectModel[];
  private statePointer: number = -1;
  private speed: number = 1;
  private running: boolean = false;
  private started: boolean = false;
  private strategy: SortStrategy;
  private iterator: any;

  constructor(private model: ArrayObjectModel) {
    this.speed = 2500 / model.array.length;
  }

  setStrategy(strategy: SortStrategy) {
    this.strategy = strategy;
    this.started = false;
  }

  run() {
    this.resetStateStack();
    this.pushStateToStack(this.model);
    this.running = true;
    this.iterator = this.strategy.iterator(this.model);
    this.started = true;
    this.next();
  }

  next() {
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
    this.running = true;
    this.next();
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
