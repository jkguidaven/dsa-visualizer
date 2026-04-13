import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ArrayDisplayComponent } from '../../common/components/array-display/array-display.component';
import {
  ArrayObjectModel,
  ArrayModelColorIndicators,
} from '../../common/classes/models/array.model';
import {
  SortStrategyFactory,
  SortStrategies,
} from '../../common/classes/strategies/sort/sort-strategy.factory';
import { SortRunner } from '../../common/classes/strategies/sort/sort-runner';

@Component({
  selector: 'app-sorting-view',
  imports: [ArrayDisplayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './sorting-view.component.html',
  styleUrl: './sorting-view.component.scss',
})
export class SortingViewComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentAlgorithm!: string;
  model: ArrayObjectModel = { array: [] };
  size = 100;
  runner!: SortRunner;

  ngOnInit() {
    this.currentAlgorithm = this.getSupportedAlgorithms()[0];
    this.initModel();
    this.initRunner();
  }

  generateModel() {
    this.initModel();
    this.initRunner();
  }

  initModel() {
    this.model.array.length = 0;
    this.populateModel();
    this.shuffleModel();
  }

  populateModel() {
    for (let i = 1; i <= this.size; i++) {
      this.model.array.push({
        value: i,
        color: ArrayModelColorIndicators.unsorted,
      });
    }
  }

  shuffleModel() {
    let m = this.model.array.length;
    let t;
    let i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = this.model.array[m];
      this.model.array[m] = this.model.array[i];
      this.model.array[i] = t;
    }
  }

  initRunner() {
    this.runner = new SortRunner(this.model);
    this.runner.onUpdate = () => this.cdr.markForCheck();
    this.setAlgorithm(this.currentAlgorithm);
  }

  getSupportedAlgorithms(): string[] {
    return Object.keys(SortStrategies);
  }

  setAlgorithm(algorithm: string) {
    const strategy = SortStrategyFactory.create(
      (SortStrategies as any)[algorithm]
    );
    if (strategy) {
      this.runner.setStrategy(strategy);
    }
  }

  play() {
    if (this.runner.hasStarted()) {
      this.runner.isRunning() ? this.runner.pause() : this.runner.resume();
    } else {
      this.runner.run();
    }
  }

  stop() {
    this.runner.stop();
  }

  next() {
    this.runner.next();
  }

  previous() {
    this.runner.previous();
  }

  canNavigateBack() {
    return !this.runner.isRunning() && this.runner.hasStarted();
  }
}
