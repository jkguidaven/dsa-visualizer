import { Component, OnInit, Input } from '@angular/core';
import { GraphObjectModel, GraphNode, GraphModelColorIndicators } from '../../classes/models/graph.model';

@Component({
  selector: 'app-graph-display',
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements OnInit {
  @Input() model: GraphObjectModel;

  movingStartingNodePointer: boolean;
  movingEndingNodePointer: boolean;


  constructor() { }

  ngOnInit() {
  }

  getNodeColor(node: GraphNode): string {
    if (this.model.isStartingNode(node)) {
      return GraphModelColorIndicators.starting;
    } else if (this.model.isEndingNode(node)) {
      return GraphModelColorIndicators.ending;
    } else {
      return node.color;
    }
  }

  isNodeClickable(node: GraphNode): boolean {
    return this.model.isStartingNode(node) || this.model.isEndingNode(node);
  }

  onMousedown(node: GraphNode): void {
    if (this.model.isStartingNode(node)) {
      this.movingStartingNodePointer = true;
    } else if (this.model.isEndingNode(node)) {
      this.movingEndingNodePointer = true;
    }
  }

  onMouseover(node: GraphNode): void {
    if (this.movingStartingNodePointer && !this.model.isEndingNode(node)) {
      this.model.setStartingNode(node);
    } else if (this.movingEndingNodePointer && !this.model.isStartingNode(node)) {
      this.model.setEndingNode(node);
    } else if (!this.model.isStartingNode(node) && !this.model.isEndingNode(node)) {
      // TO-DO make this node as weighted node
    }
  }

  onMouseup(): void {
    this.movingStartingNodePointer = false;
    this.movingEndingNodePointer = false;
  }
}
