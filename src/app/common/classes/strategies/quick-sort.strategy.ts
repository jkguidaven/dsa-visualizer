import { ArrayObjectModel, ArrayModelColorIndicators, ArrayObjectItem } from '../models/array.model';
import { SortStrategy } from './sort-strategy';

export class QuickSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {
    yield* this.quickSort(model, 0, model.array.length - 1);

    model.array.forEach((item) => item.color = ArrayModelColorIndicators.sorted);

    return model;
  }

  *quickSort(model: ArrayObjectModel, low: number, high: number) {
    if (low < high) {

        const partitionIterator = this.partition(model, low, high);
        let partitionYieldResult = partitionIterator.next();
        let pi;

        while (!partitionYieldResult.done) {
          yield partitionYieldResult.value;
          partitionYieldResult = partitionIterator.next();
        }

        pi = partitionYieldResult.value;

        yield* this.quickSort(model, low, pi - 1);
        yield* this.quickSort(model, pi + 1, high);

    }
  }

  *partition(model: ArrayObjectModel, low: number, high: number) {
    // pivot (Element to be placed at right position)
    for (let x = low; x <= high; x++) {
      model.array[x].color = ArrayModelColorIndicators.unsorted;
    }

    const pivot = model.array[high].value;
    model.array[high].color = ArrayModelColorIndicators.traverse;
    yield model;

    let i = (low - 1);  // Index of smaller element

    for (let j = low; j <= high - 1; j++) {
        // If current element is smaller than the pivot
        model.array[j].color = ArrayModelColorIndicators.compared;
        if (model.array[j].value < pivot) {
            i++;
            const tempI = model.array[i].value;
            model.array[i].value = model.array[j].value;
            model.array[j].value = tempI;
        }

        yield model;
    }

    const temp = model.array[i + 1].value;
    model.array[i + 1].value = model.array[high].value;
    model.array[high].value = temp;


    for (let x = low; x <= high; x++) {
      model.array[x].color = ArrayModelColorIndicators.temporarysorted;
    }

    return (i + 1);
  }
}
