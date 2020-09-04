import { SortStrategy } from './sort-strategy';
import { BubbleSortStrategy } from './bubble-sort.strategy';

export enum SortStrategies {
  BUBBLE_SORT
};

export class SortStrategyFactory {
  public static create(strategy: SortStrategies): SortStrategy {
    switch (strategy) {
      case SortStrategies.BUBBLE_SORT:
        return new BubbleSortStrategy();
      default:
        return null;
    }
  }
}
