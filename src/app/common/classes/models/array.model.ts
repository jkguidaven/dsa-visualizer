
export interface ArrayObjectItem {
  value: number;
  color: string;
};

export interface ArrayObjectModel {
  array: ArrayObjectItem[];
};

export enum ArrayModelColorIndicators {
  unsorted = 'lightgrey',
  traverse = 'grey',
  sorted = 'green',
  compared = 'blue',
};
