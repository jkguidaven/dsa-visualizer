import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GraphObjectModel, GraphNode, GraphModelColorIndicators } from '../../classes/models/graph.model';

@Component({
  selector: 'app-graph-display',
  templateUrl: './graph-display.component.html',
  styleUrls: ['./graph-display.component.scss']
})
export class GraphDisplayComponent implements OnInit {
  @Input() model: GraphObjectModel;
  @Input() locked: boolean;
  @Output() nodeChange: EventEmitter<any> = new EventEmitter();

  movingStartingNodePointer: boolean;
  movingEndingNodePointer: boolean;
  moving: boolean;


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
    return !this.locked && (this.model.isStartingNode(node) || this.model.isEndingNode(node));
  }

  onMousedown(node: GraphNode): void {
    if (this.locked) {
      return;
    } else if (this.model.isStartingNode(node)) {
      this.movingStartingNodePointer = true;
    } else if (this.model.isEndingNode(node)) {
      this.movingEndingNodePointer = true;
    }

    this.moving = !this.movingEndingNodePointer && !this.movingStartingNodePointer;
  }

  onMouseover(node: GraphNode): void {
    if (this.locked) {
      return;
    } else if (this.movingStartingNodePointer && !this.model.isEndingNode(node) && node.color !== GraphModelColorIndicators.blocked) {
      this.model.setStartingNode(node);
      this.nodeChange.emit(this.model);
    } else if (this.movingEndingNodePointer && !this.model.isStartingNode(node) && node.color !== GraphModelColorIndicators.blocked) {
      this.model.setEndingNode(node);
      this.nodeChange.emit(this.model);
    } else if (this.moving && !this.model.isStartingNode(node) && !this.model.isEndingNode(node)) {
      node.color = GraphModelColorIndicators.blocked;
    }
  }

  onMouseup(): void {
    this.movingStartingNodePointer = false;
    this.movingEndingNodePointer = false;
    this.moving = false;
  }
}
