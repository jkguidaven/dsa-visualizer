import { ArrayObjectModel, ArrayModelColorIndicators } from '../models/array.model';
import { SortStrategy } from './sort-strategy';

export class BubbleSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {
    let swapped;

    let currentSorted = model.array.length - 1;
    do {
      swapped = false;
      for (let i = 1; i <= currentSorted; i++) {
        const currTraversedColor = model.array[i - 1].color;
        const currComparedColor = model.array[i].color;

        model.array[i - 1].color = ArrayModelColorIndicators.traverse;
        model.array[i].color = ArrayModelColorIndicators.compared;

        yield model;

        if (model.array[i - 1].value > model.array[i].value) {
          const temp = model.array[i - 1].value;
          model.array[i - 1].value = model.array[i].value;
          model.array[i].value = temp;
          swapped = true;
          yield model;
        }

        model.array[i].color = currComparedColor;
        model.array[i - 1].color = currTraversedColor;
      }

      model.array[currentSorted--].color = ArrayModelColorIndicators.sorted;

    } while (swapped);

    while (currentSorted >= 0) {
      model.array[currentSorted--].color = ArrayModelColorIndicators.sorted;
    }

    return model;
  }
}
