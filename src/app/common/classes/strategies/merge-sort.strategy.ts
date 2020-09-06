import { ArrayObjectModel, ArrayModelColorIndicators, ArrayObjectItem } from '../models/array.model';
import { SortStrategy } from './sort-strategy';

export class MergeSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {
    yield* this.mergeSort(model, 0, model.array.length - 1);

    model.array.forEach((item) => item.color = ArrayModelColorIndicators.sorted);

    return model;
  }

  *mergeSort(model: ArrayObjectModel, left: number, right: number) {
    if (left < right) {
        // Calculate middle
        const middle = Math.floor(left + (right - left) / 2);

        // Sort first then second halves
        yield* this.mergeSort(model, left, middle);
        yield* this.mergeSort(model, middle + 1, right);

        yield* this.merge(model, left, middle, right);
    }
  }

  *merge(model: ArrayObjectModel, left: number, middle: number, right: number) {
    for (let i = left; i <= right; i++) {
      model.array[i].color = ArrayModelColorIndicators.traverse;
    }

    yield model;

    /* create temp arrays */
    const leftArray = model.array.slice(left, middle + 1);
    const rightArray = model.array.slice(middle + 1, right + 1);

    // let start in the left index;
    let currentIndex = left;

    // begin merging by comparing left and right array
    while (leftArray.length && rightArray.length) {
      const leftCompare = leftArray[0];
      const rightCompare = rightArray[0];
      leftCompare.color = ArrayModelColorIndicators.compared;
      rightCompare.color = ArrayModelColorIndicators.compared;
      yield model;
      model.array[currentIndex++] = leftCompare.value < rightCompare.value
        ? leftArray.shift()
        : rightArray.shift();
    }

    yield model;

    while (leftArray.length) {
      model.array[currentIndex++] = leftArray.shift();
    }

    while (rightArray.length) {
      model.array[currentIndex++] = rightArray.shift();
    }

    for (let i = left; i <= right; i++) {
      model.array[i].color = ArrayModelColorIndicators.temporarysorted;
    }

    yield model;
  }
}
