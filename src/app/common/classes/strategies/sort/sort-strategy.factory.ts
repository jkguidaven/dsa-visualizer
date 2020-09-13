import { SortStrategy } from './sort-strategy';
import { BubbleSortStrategy } from './bubble-sort.strategy';
import { SelectionSortStrategy } from './selection-sort.strategy';
import { InsertionSortStrategy } from './insertion-sort.strategy';
import { MergeSortStrategy } from './merge-sort.strategy';
import { QuickSortStrategy } from './quick-sort.strategy';
import { HeapSortStrategy } from './heap-sort.strategy';

export enum SortStrategies {
  BUBBLE_SORT = 'Bubble sort',
  SELECTION_SORT = 'Selection sort',
  INSERTION_SORT = 'Insertion sort',
  MERGE_SORT = 'Merge sort',
  QUICK_SORT = 'Quick sort',
  HEAP_SORT = 'Heap sort',
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
      case SortStrategies.MERGE_SORT:
        return new MergeSortStrategy();
      case SortStrategies.QUICK_SORT:
        return new QuickSortStrategy();
      case SortStrategies.HEAP_SORT:
        return new HeapSortStrategy();
      default:
        return null;
    }
  }
}
