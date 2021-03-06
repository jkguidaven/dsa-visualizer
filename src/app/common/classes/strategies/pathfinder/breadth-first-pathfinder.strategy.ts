import { PathFinderStrategy } from './pathfinder-strategy';
import { GraphObjectModel, GraphModelColorIndicators, GraphNode } from '../../models/graph.model';

export class BreadthFirstPathFinderStrategy implements PathFinderStrategy {
  *iterator(model: GraphObjectModel, skip: boolean) {
    const queue: GraphNode[] = [];
    queue.push(model.getStartingNode());

    while (queue.length) {
      let currentNode = queue.shift();
      currentNode.color = GraphModelColorIndicators.visited;

      if (currentNode === model.getEndingNode()) {

        // backtrack the parent nodes to get the path
        while (currentNode.parentNode) {
          currentNode.parentNode.color = GraphModelColorIndicators.routed;
          currentNode = currentNode.parentNode;
        }

        model.setSolved(true);
        return model;
      } else if (!skip) {
        yield model;
      }

      currentNode.neighbors.forEach((neighbor) => {
        if (neighbor.color !== GraphModelColorIndicators.visited &&
          neighbor.color !== GraphModelColorIndicators.blocked) {
          neighbor.color = GraphModelColorIndicators.visited;
          neighbor.parentNode = currentNode;
          queue.push(neighbor);
        }
      });
    }

    return model;
  }
}
