import { PathFinderStrategy } from './pathfinder-strategy';
import { GraphObjectModel, GraphModelColorIndicators, GraphNode } from '../../models/graph.model';

export class DepthFirstPathFinderStrategy implements PathFinderStrategy {
  *iterator(model: GraphObjectModel, skip: boolean) {
    const stack: GraphNode[] = [];
    stack.push(model.getStartingNode());

    while (stack.length) {
      let currentNode = stack[stack.length - 1];

      if (currentNode.color !== GraphModelColorIndicators.visited &&
        currentNode === model.getEndingNode()) {
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

      currentNode.color = GraphModelColorIndicators.visited;

      const next = currentNode.neighbors.find((neighbor) => {
        if (neighbor.color !== GraphModelColorIndicators.visited &&
          neighbor.color !== GraphModelColorIndicators.blocked) {
          neighbor.parentNode = currentNode;
          return neighbor;
        }
      });

      if (next) {
        stack.push(next);
      } else {
        stack.pop();
      }
    }

    return model;
  }
}
