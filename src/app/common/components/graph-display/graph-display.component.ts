import { Component, input, output } from '@angular/core';
import {
  GraphObjectModel,
  GraphNode,
  GraphModelColorIndicators,
} from '../../classes/models/graph.model';

@Component({
  selector: 'app-graph-display',
  imports: [],
  templateUrl: './graph-display.component.html',
  styleUrl: './graph-display.component.scss',
})
export class GraphDisplayComponent {
  model = input.required<GraphObjectModel>();
  locked = input(false);
  nodeChange = output<any>();

  movingStartingNodePointer = false;
  movingEndingNodePointer = false;
  moving = false;

  getNodeColor(node: GraphNode): string {
    const m = this.model();
    if (m.isStartingNode(node)) {
      return GraphModelColorIndicators.starting;
    } else if (m.isEndingNode(node)) {
      return GraphModelColorIndicators.ending;
    } else {
      return node.color;
    }
  }

  isNodeClickable(node: GraphNode): boolean {
    const m = this.model();
    return !this.locked() && (m.isStartingNode(node) || m.isEndingNode(node));
  }

  onMousedown(node: GraphNode): void {
    const m = this.model();
    if (this.locked()) {
      return;
    } else if (m.isStartingNode(node)) {
      this.movingStartingNodePointer = true;
    } else if (m.isEndingNode(node)) {
      this.movingEndingNodePointer = true;
    }

    this.moving =
      !this.movingEndingNodePointer && !this.movingStartingNodePointer;
  }

  onMouseover(node: GraphNode): void {
    const m = this.model();
    if (this.locked()) {
      return;
    } else if (
      this.movingStartingNodePointer &&
      !m.isEndingNode(node) &&
      node.color !== GraphModelColorIndicators.blocked
    ) {
      m.setStartingNode(node);
      this.nodeChange.emit(m);
    } else if (
      this.movingEndingNodePointer &&
      !m.isStartingNode(node) &&
      node.color !== GraphModelColorIndicators.blocked
    ) {
      m.setEndingNode(node);
      this.nodeChange.emit(m);
    } else if (
      this.moving &&
      !m.isStartingNode(node) &&
      !m.isEndingNode(node)
    ) {
      node.color = GraphModelColorIndicators.blocked;
    }
  }

  onMouseup(): void {
    this.movingStartingNodePointer = false;
    this.movingEndingNodePointer = false;
    this.moving = false;
  }
}
