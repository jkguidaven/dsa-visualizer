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

  width = 30;
  height = 20;

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

  randomizePosition() {
    const matrix = this.model.getNodeMatrix();

    // randomize staring node
    let x = Math.floor(Math.random() * this.model.getWidth());
    let y = Math.floor(Math.random() * this.model.getHeight());
    this.model.setStartingNode(matrix[y][x]);

    // randomize ending node
    x = Math.floor(Math.random() * this.model.getWidth());
    y = Math.floor(Math.random() * this.model.getHeight());
    this.model.setEndingNode(matrix[y][x]);

    this.model.getNodeMatrix().forEach((row) => {
      row.forEach((node) => node.color = GraphModelColorIndicators.unvisited);
    });
  }

  initRunner() {
    this.runner = new PathFinderRunner(this.model);
    this.setAlgorithm(this.currentAlgorithm);
  }

  getSupportedAlgorithms(): any[] {
    return Object.keys(PathFinderStrategies);
  }

  setAlgorithm(algorithm: string) {
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
}
