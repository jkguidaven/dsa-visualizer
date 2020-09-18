import { Component, OnInit } from '@angular/core';
import { GraphObjectModel, GraphModelColorIndicators } from 'src/app/common/classes/models/graph.model';
import { PathFinderRunner } from 'src/app/common/classes/strategies/pathfinder/pathfinder-runner';
import {
  PathFinderStrategies,
  PathFinderStrategyFactory
} from 'src/app/common/classes/strategies/pathfinder/pathfinder-strategy.factory';

@Component({
  selector: 'app-pathfinder-view',
  templateUrl: './pathfinder-view.component.html',
  styleUrls: ['./pathfinder-view.component.scss']
})
export class PathfinderViewComponent implements OnInit {
  public currentAlgorithm: string;
  public model: GraphObjectModel;
  public runner: PathFinderRunner;
  public withMaze: boolean;

  width = 49;
  height = 29;

  constructor() { }

  ngOnInit() {
    this.currentAlgorithm = this.getSupportedAlgorithms()[0];
    this.initModel();
    this.initRunner();
  }

  initModel() {
    this.model = new GraphObjectModel(this.width, this.height);
    const matrix = this.model.getNodeMatrix();

    this.model.setStartingNode(matrix[0][0]);
    this.model.setEndingNode(matrix[matrix.length - 1][matrix[0].length - 1]);
  }

  randomize() {
    this.model.reset({ hard: true });
    const matrix = this.model.getNodeMatrix();

    // randomize staring node
    let x = Math.floor(Math.random() * this.model.getWidth()) + 1;
    let y = Math.floor(Math.random() * this.model.getHeight()) + 1;
    this.model.setStartingNode(matrix[y][x]);

    if (this.withMaze) {
      this.randomizeMaze();
    }

    // randomize ending node
    do {
      x = Math.floor(Math.random() * this.model.getWidth());
      y = Math.floor(Math.random() * this.model.getHeight());
    } while (matrix[y][x].color !== GraphModelColorIndicators.unvisited);

    this.model.setEndingNode(matrix[y][x]);
  }

  private randomizeMaze() {
    // This randomization is based on Randomized Prim's algorithm
    this.model.getAllNodes().forEach((node) => node.color = GraphModelColorIndicators.blocked);
    const currentNode = this.model.getStartingNode();
    currentNode.color = GraphModelColorIndicators.unvisited;
    const maze = [currentNode];
    const frontiers = this.getFrontiers(currentNode, true);

    while (frontiers.length) {
      const frontier = frontiers[Math.floor(Math.random() * frontiers.length)];

      const neighbors = this.getFrontiers(frontier, false);

      if (neighbors.length) {
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
        if (!(maze.includes(neighbor) && maze.includes(frontier))) {
          maze.push(neighbor);
          maze.push(frontier);
          this.connectFrontier(neighbor, frontier);
        }
      }

      this.getFrontiers(frontier, true).forEach((next) => frontiers.push(next));
      frontiers.splice(frontiers.indexOf(frontier), 1);
    }
  }

  private getFrontiers(frontier, matchToBlock) {
    const matrix = this.model.getNodeMatrix();
    const left =  frontier.x > 1 ? matrix[frontier.y][frontier.x - 2] : null;
    const right = frontier.x < this.model.getWidth() - 2 ?  matrix[frontier.y][frontier.x + 2] : null;
    const top = frontier.y > 1 ? matrix[frontier.y - 2][frontier.x] : null;
    const bottom = frontier.y < this.model.getHeight() - 2 ? matrix[frontier.y + 2][frontier.x] : null;
    return [ left , right, top, bottom ]
      .filter((neighbor) => {
        return neighbor &&
          (matchToBlock
            ? neighbor.color === GraphModelColorIndicators.blocked
            : neighbor.color === GraphModelColorIndicators.unvisited);
      });
  }

  private connectFrontier(frontier1, frontier2) {

    if (frontier1.x === frontier2.x) {
      const offsetY = frontier1.y > frontier2.y ? -1 : 1;
      this.model.getNodeMatrix()
        [frontier1.y + offsetY][frontier1.x].color = GraphModelColorIndicators.unvisited;
    } else {
      const offsetX = frontier1.x > frontier2.x ? -1 : 1;
      this.model.getNodeMatrix()
        [frontier1.y][frontier1.x + offsetX].color = GraphModelColorIndicators.unvisited;
    }

    frontier1.color = GraphModelColorIndicators.unvisited;
    frontier2.color = GraphModelColorIndicators.unvisited;
  }

  initRunner() {
    this.runner = new PathFinderRunner(this.model);
    this.setAlgorithm(this.currentAlgorithm);
  }

  getSupportedAlgorithms(): any[] {
    return Object.keys(PathFinderStrategies);
  }

  setAlgorithm(algorithm: string) {
    this.model.reset();
    this.runner.setStrategy(PathFinderStrategyFactory.create(PathFinderStrategies[algorithm]));
  }

  play() {
    if (this.runner.hasStarted()) {
      this.runner.isRunning()
        ? this.runner.pause()
        : this.runner.resume();
    } else {
      this.runner.run();
    }
  }

  stop() {
    this.runner.stop();
  }

  next() {
    this.runner.next();
  }

  previous() {
    this.runner.previous();
  }

  canNavigateBack() {
    return !this.runner.isRunning() && this.runner.hasStarted();
  }

  handleModelChange() {
    if (this.model.isSolved()) {
      this.model.reset();
      this.runner.quickRun();
    }
  }
}
