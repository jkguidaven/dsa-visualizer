import { Component, OnInit, Input } from '@angular/core';
import { ArrayObjectModel } from './array.model';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.scss']
})
export class ArrayDisplayComponent implements OnInit {
  @Input() model: ArrayObjectModel = {
    array: [
      { value: 3, color: 'red' },
      { value: 1, color: 'yellow' },
      { value: 2, color: 'blue' }
    ],
    size: 3
  };

  constructor() { }

  ngOnInit() {
  }
}
