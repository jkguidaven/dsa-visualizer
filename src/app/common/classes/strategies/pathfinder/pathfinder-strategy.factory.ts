import { PathFinderStrategy } from './pathfinder-strategy';
import { BreadthFirstPathFinderStrategy } from './breadth-first-pathfinder.strategy';
import { DepthFirstPathFinderStrategy } from './depth-first-pathfinder.strategy';

export enum PathFinderStrategies {
  BREADTH_FIRST = 'Breadth First',
  DEPTH_FIRST = 'Depth First',
  DIJKSTRA = 'Dijkstra',
  A_STAR = 'A*',
}

export class PathFinderStrategyFactory {
  public static create(strategy: PathFinderStrategies): PathFinderStrategy {
    switch (strategy) {
      case PathFinderStrategies.BREADTH_FIRST:
        return new BreadthFirstPathFinderStrategy();
      case PathFinderStrategies.DEPTH_FIRST:
        return new DepthFirstPathFinderStrategy();
      case PathFinderStrategies.DIJKSTRA:
        return null;
      case PathFinderStrategies.A_STAR:
        return null;
      default:
        return null;
    }
  }
}
