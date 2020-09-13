import { Component, OnInit } from '@angular/core';
import { GraphObjectModel } from 'src/app/common/classes/models/graph.model';

@Component({
  selector: 'app-pathfinder-view',
  templateUrl: './pathfinder-view.component.html',
  styleUrls: ['./pathfinder-view.component.scss']
})
export class PathfinderViewComponent implements OnInit {
  width = 30;
  height = 20;
  model: GraphObjectModel;

  constructor() { }

  ngOnInit() {
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
  }
}
