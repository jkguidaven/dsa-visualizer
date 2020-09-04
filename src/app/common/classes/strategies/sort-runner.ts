import { SortStrategy } from './sort-strategy';
import { ArrayObjectModel } from '../models/array.model';

export class SortRunner {
  private speed = 1;
  private running = false;
  private iterator: any;

  constructor(private strategy: SortStrategy, private model: ArrayObjectModel) {
  }

  run() {
    this.running = true;
    this.iterator = this.strategy.iterator(this.model);
    this.next();
  }

  private next() {
    setTimeout(() => {
      const state = this.iterator.next();
      console.log(state.value);
      if (this.running && !state.done) {
        this.next();
      }
    }, this.speed);
  }

  stop() {
    this.running = false;
  }
}
