import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { GraphDisplayComponent } from '../../common/components/graph-display/graph-display.component';
import {
  GraphObjectModel,
  GraphNode,
  GraphModelColorIndicators,
} from '../../common/classes/models/graph.model';
import { PathFinderRunner } from '../../common/classes/strategies/pathfinder/pathfinder-runner';
import {
  PathFinderStrategies,
  PathFinderStrategyFactory,
} from '../../common/classes/strategies/pathfinder/pathfinder-strategy.factory';

@Component({
  selector: 'app-pathfinder-view',
  imports: [GraphDisplayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './pathfinder-view.component.html',
  styleUrl: './pathfinder-view.component.scss',
})
export class PathfinderViewComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  currentAlgorithm!: string;
  model!: GraphObjectModel;
  runner!: PathFinderRunner;
  withMaze = false;

  width = 49;
  height = 29;

  ngOnInit() {
    this.currentAlgorithm = this.getSupportedAlgorithms()[0];
    this.initModel();
    this.initRunner();
  }

  initModel() {
    this.model = new GraphObjectModel(this.width, this.height);
    const matrix = this.model.getNodeMatrix();

    this.model.setStartingNode(matrix[0][0]);
    this.model.setEndingNode(
      matrix[matrix.length - 1][matrix[0].length - 1]
    );
  }

  randomize() {
    this.model.reset({ hard: true });
    const matrix = this.model.getNodeMatrix();

    let x = Math.floor(Math.random() * this.model.getWidth()) + 1;
    let y = Math.floor(Math.random() * this.model.getHeight()) + 1;
    this.model.setStartingNode(matrix[y][x]);

    if (this.withMaze) {
      this.randomizeMaze();
    }

    do {
      x = Math.floor(Math.random() * this.model.getWidth());
      y = Math.floor(Math.random() * this.model.getHeight());
    } while (matrix[y][x].color !== GraphModelColorIndicators.unvisited);

    this.model.setEndingNode(matrix[y][x]);
  }

  private randomizeMaze() {
    this.model
      .getAllNodes()
      .forEach((node) => (node.color = GraphModelColorIndicators.blocked));
    const currentNode = this.model.getStartingNode();
    currentNode.color = GraphModelColorIndicators.unvisited;
    const maze = [currentNode];
    const frontiers = this.getFrontiers(currentNode, true);

    while (frontiers.length) {
      const frontier =
        frontiers[Math.floor(Math.random() * frontiers.length)];

      const neighbors = this.getFrontiers(frontier, false);

      if (neighbors.length) {
        const neighbor =
          neighbors[Math.floor(Math.random() * neighbors.length)];
        if (!(maze.includes(neighbor) && maze.includes(frontier))) {
          maze.push(neighbor);
          maze.push(frontier);
          this.connectFrontier(neighbor, frontier);
        }
      }

      this.getFrontiers(frontier, true).forEach((next) =>
        frontiers.push(next)
      );
      frontiers.splice(frontiers.indexOf(frontier), 1);
    }
  }

  private getFrontiers(frontier: any, matchToBlock: boolean) {
    const matrix = this.model.getNodeMatrix();
    const left =
      frontier.x > 1 ? matrix[frontier.y][frontier.x - 2] : null;
    const right =
      frontier.x < this.model.getWidth() - 2
        ? matrix[frontier.y][frontier.x + 2]
        : null;
    const top =
      frontier.y > 1 ? matrix[frontier.y - 2][frontier.x] : null;
    const bottom =
      frontier.y < this.model.getHeight() - 2
        ? matrix[frontier.y + 2][frontier.x]
        : null;
    return [left, right, top, bottom].filter((neighbor): neighbor is GraphNode => {
      return (
        neighbor != null &&
        (matchToBlock
          ? neighbor.color === GraphModelColorIndicators.blocked
          : neighbor.color === GraphModelColorIndicators.unvisited)
      );
    });
  }

  private connectFrontier(frontier1: any, frontier2: any) {
    if (frontier1.x === frontier2.x) {
      const offsetY = frontier1.y > frontier2.y ? -1 : 1;
      this.model.getNodeMatrix()[frontier1.y + offsetY][
        frontier1.x
      ].color = GraphModelColorIndicators.unvisited;
    } else {
      const offsetX = frontier1.x > frontier2.x ? -1 : 1;
      this.model.getNodeMatrix()[frontier1.y][
        frontier1.x + offsetX
      ].color = GraphModelColorIndicators.unvisited;
    }

    frontier1.color = GraphModelColorIndicators.unvisited;
    frontier2.color = GraphModelColorIndicators.unvisited;
  }

  initRunner() {
    this.runner = new PathFinderRunner(this.model);
    this.runner.onUpdate = () => this.cdr.markForCheck();
    this.setAlgorithm(this.currentAlgorithm);
  }

  getSupportedAlgorithms(): string[] {
    return Object.keys(PathFinderStrategies);
  }

  setAlgorithm(algorithm: string) {
    this.model.reset();
    const strategy = PathFinderStrategyFactory.create(
      (PathFinderStrategies as any)[algorithm]
    );
    if (strategy) {
      this.runner.setStrategy(strategy);
    }
  }

  play() {
    if (this.runner.hasStarted()) {
      this.runner.isRunning() ? this.runner.pause() : this.runner.resume();
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
