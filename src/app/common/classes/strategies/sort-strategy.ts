import { ArrayObjectModel } from '../models/array.model';

export interface SortStrategy {
  iterator(model: ArrayObjectModel);
}
