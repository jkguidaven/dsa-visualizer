import { GraphObjectModel } from '../../models/graph.model';

export interface PathFinderStrategy {
  iterator(model: GraphObjectModel);
}
