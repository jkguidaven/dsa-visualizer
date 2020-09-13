
export enum GraphModelColorIndicators {
  unvisited = 'lightgrey',
  visited = 'grey',
  starting = 'blue',
  ending = 'red',
}

export interface GraphNode {
  weight: number;
  value: number;
  color: GraphModelColorIndicators;
  neighbors: GraphNode[];
}

export class GraphObjectModel {
  private startingNode: GraphNode;
  private endingNode: GraphNode;
  private nodeMatrix: GraphNode[][];

  constructor(private width: number, private height: number) {
    this.initData();
    this.connectNodes();
  }

  private initData(): void {
    this.nodeMatrix = [ ...Array(this.height).keys() ]
    .map((row) => {
      return [ ...Array(this.width).keys() ]
        .map((col) => {
          return {
            weight: 0,
            value: (row + 1) * (col + 1),
            color: GraphModelColorIndicators.unvisited,
            neighbors: []
          };
        });
    });
  }

  private connectNodes(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
      this.nodeMatrix[y][x].neighbors = this.getNeighborsByCoordinate(x, y);
      }
    }
  }

  private getNeighborsByCoordinate(x: number, y: number): GraphNode[] {
    const neighbors = [];
    if (x > 0) { neighbors.push(this.nodeMatrix[y][x - 1]); }
    if (y > 0) { neighbors.push(this.nodeMatrix[y - 1][x]); }
    if (x < this.width - 1) { neighbors.push(this.nodeMatrix[y][x + 1]); }
    if (y < this.height - 1) { neighbors.push(this.nodeMatrix[y + 1][x]); }
    return neighbors;
  }

  getNodeMatrix(): GraphNode[][] {
    return this.nodeMatrix;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
  setStartingNode(node: GraphNode): void {
    this.startingNode = node;
  }

  getStartingNode(): GraphNode {
    return this.startingNode;
  }

  getEndingNode(): GraphNode {
    return this.endingNode;
  }

  setEndingNode(node: GraphNode): void {
    this.endingNode = node;
  }

  isStartingNode(node: GraphNode): boolean {
    return this.startingNode && this.startingNode === node;
  }

  isEndingNode(node: GraphNode): boolean {
    return this.endingNode && this.endingNode === node;
  }
}
