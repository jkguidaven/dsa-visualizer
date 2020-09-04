import { Component, OnInit, Input } from '@angular/core';
import { ArrayObjectModel } from '../../classes/models/array.model';

@Component({
  selector: 'app-array-display',
  templateUrl: './array-display.component.html',
  styleUrls: ['./array-display.component.scss']
})
export class ArrayDisplayComponent implements OnInit {
  @Input() model: ArrayObjectModel = null;

  constructor() { }

  ngOnInit() {
  }
}
