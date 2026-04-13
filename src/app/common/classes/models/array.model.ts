
export interface ArrayObjectItem {
  value: number;
  color: string;
}

export interface ArrayObjectModel {
  array: ArrayObjectItem[];
}

export enum ArrayModelColorIndicators {
  unsorted = 'var(--app-cell-default)',
  traverse = 'var(--app-cell-traverse)',
  sorted = 'green',
  compared = 'blue',
  temporarysorted = 'violet'
}
