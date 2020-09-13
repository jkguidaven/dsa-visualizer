import { ArrayObjectModel, ArrayModelColorIndicators } from '../../models/array.model';
import { SortStrategy } from './sort-strategy';

export class InsertionSortStrategy implements SortStrategy {
  *iterator(model: ArrayObjectModel) {

    model.array[0].color = ArrayModelColorIndicators.temporarysorted;
    for (let i = 1; i < model.array.length; i++) {
      model.array[i].color = ArrayModelColorIndicators.traverse;

      yield model;

      const key = model.array[i].value;
      let j = i - 1;


      while (j >= 0 && model.array[j].value > key)  {
        model.array[j].color = ArrayModelColorIndicators.compared;
        model.array[j + 1].value = model.array[j].value;
        yield model;
        model.array[j].color = ArrayModelColorIndicators.temporarysorted;
        j--;
      }

      model.array[j + 1].value = key;
      model.array[i].color = ArrayModelColorIndicators.temporarysorted;
    }

    model.array.forEach((item) => item.color = ArrayModelColorIndicators.sorted);

    return model;
  }
}
