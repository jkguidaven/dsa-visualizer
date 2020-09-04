import { Component, OnInit } from '@angular/core';
import { ArrayObjectModel, ArrayModelColorIndicators } from 'src/app/common/classes/models/array.model';
import { SortStrategyFactory, SortStrategies } from 'src/app/common/classes/strategies/sort-strategy.factory';
import { SortStrategy } from 'src/app/common/classes/strategies/sort-strategy';
import { SortRunner } from 'src/app/common/classes/strategies/sort-runner';

@Component({
  selector: 'app-sorting-view',
  templateUrl: './sorting-view.component.html',
  styleUrls: ['./sorting-view.component.scss']
})
export class SortingViewComponent implements OnInit {
  private strategy: SortStrategy = SortStrategyFactory.create(SortStrategies.SELECTION_SORT);
  public runner: SortRunner;
  private model: ArrayObjectModel = { array: [] };
  private size = 100;

  constructor() { }

  ngOnInit() {
    this.initModel();
    this.initRunner();
    this.runner.run();
  }

  initModel() {
    this.model.array.slice(0, this.model.array.length);
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
    this.runner = new SortRunner(this.strategy, this.model);
  }
}
