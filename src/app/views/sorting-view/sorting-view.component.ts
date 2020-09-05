import { Component, OnInit } from '@angular/core';
import { ArrayObjectModel, ArrayModelColorIndicators } from 'src/app/common/classes/models/array.model';
import { SortStrategyFactory, SortStrategies } from 'src/app/common/classes/strategies/sort-strategy.factory';
import { SortRunner } from 'src/app/common/classes/strategies/sort-runner';

@Component({
  selector: 'app-sorting-view',
  templateUrl: './sorting-view.component.html',
  styleUrls: ['./sorting-view.component.scss']
})
export class SortingViewComponent implements OnInit {
  public currentAlgorithm: string;
  private model: ArrayObjectModel = { array: [] };
  private size = 100;

  public runner: SortRunner;

  constructor() { }

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
        color: ArrayModelColorIndicators.unsorted
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
    this.runner = new SortRunner(null, this.model);
    this.setAlgorithm(this.currentAlgorithm);
  }

  getSupportedAlgorithms(): any[] {
    return Object.keys(SortStrategies);
  }

  setAlgorithm(algorithm: string) {
    this.runner.setStrategy(SortStrategyFactory.create(SortStrategies[algorithm]));
  }

  play() {
    if (this.runner.hasStarted()) {
      this.runner.isRunning()
        ? this.runner.pause()
        : this.runner.resume();
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

  canNavigate() {
    return !this.runner.isRunning() && this.runner.hasStarted();
  }
}
