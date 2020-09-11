import { ArrayObjectModel, ArrayModelColorIndicators, ArrayObjectItem } from '../models/array.model';
import { SortStrategy } from './sort-strategy';

export class HeapSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {
    const n = model.array.length;

    // Build heap (rearrange array)
    for (let i = n / 2 - 1; i >= 0; i--) {
        yield* this.heapify(model, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        const temp = model.array[0].value;
        model.array[0].value = model.array[i].value;
        model.array[i].value = temp;
        model.array[i].color = ArrayModelColorIndicators.sorted;
        yield model;

        // call max heapify on the reduced heap
        yield* this.heapify(model, i, 0);
    }


    model.array[0].color = ArrayModelColorIndicators.sorted;
    return model;
  }

  *heapify(model: ArrayObjectModel, n: number, i: number) {
    for (let x = 0; x < i; x++) {
      model.array[x].color = ArrayModelColorIndicators.unsorted;
    }

    let largest = i; // Initialize largest as root
    const l = 2 * i + 1; // left = 2*i + 1
    const r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    model.array[largest].color = ArrayModelColorIndicators.traverse;
    if (l < n) {
      model.array[l].color = ArrayModelColorIndicators.compared;
      yield model;
    }

    if (l < n && model.array[l].value > model.array[largest].value) {
        largest = l;
    }

    // If right child is larger than largest so far
    if (r < n) {
      model.array[r].color = ArrayModelColorIndicators.compared;
      yield model;
    }

    if (r < n && model.array[r].value > model.array[largest].value) {
        largest = r;
    }

    // If largest is not root
    if (largest !== i) {
        const swap = model.array[i].value;
        model.array[i].value = model.array[largest].value;
        model.array[largest].value = swap;

        // Recursively heapify the affected sub-tree
        yield* this.heapify(model, n, largest);
    }
  }
}
