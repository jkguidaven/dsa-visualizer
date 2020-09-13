import { ArrayObjectModel, ArrayModelColorIndicators } from '../../models/array.model';
import { SortStrategy } from './sort-strategy';

export class SelectionSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {

    for (let i = 0; i < model.array.length - 1; i++) {
      model.array[i].color = ArrayModelColorIndicators.traverse;

      yield model;

      let min = i;
      for (let x = i + 1; x < model.array.length; x++) {
        model.array[x].color = ArrayModelColorIndicators.compared;
        yield model;

        if (model.array[x].value < model.array[min].value) {
          min = x;
        }

        model.array[x].color = ArrayModelColorIndicators.unsorted;
      }

      const temp = model.array[min].value;
      model.array[min].value = model.array[i].value;
      model.array[i].value = temp;
      yield model;

      model.array[i].color = ArrayModelColorIndicators.sorted;
    }

    model.array[model.array.length - 1].color = ArrayModelColorIndicators.sorted;
    return model;
  }
}
