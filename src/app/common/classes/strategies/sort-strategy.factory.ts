import { SortStrategy } from './sort-strategy';
import { BubbleSortStrategy } from './bubble-sort.strategy';
import { SelectionSortStrategy } from './selection-sort.strategy';
import { InsertionSortStrategy } from './insertion-sort.strategy';

export enum SortStrategies {
  BUBBLE_SORT = 'Bubble sort',
  SELECTION_SORT = 'Selection sort',
  INSERTION_SORT = 'Insertion sort'
}

export class SortStrategyFactory {
  public static create(strategy: SortStrategies): SortStrategy {
    switch (strategy) {
      case SortStrategies.BUBBLE_SORT:
        return new BubbleSortStrategy();
      case SortStrategies.SELECTION_SORT:
        return new SelectionSortStrategy();
      case SortStrategies.INSERTION_SORT:
        return new InsertionSortStrategy();
      default:
        return null;
    }
  }
}
