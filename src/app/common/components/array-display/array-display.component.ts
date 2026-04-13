import { Component, input } from '@angular/core';
import { ArrayObjectModel } from '../../classes/models/array.model';

@Component({
  selector: 'app-array-display',
  imports: [],
  templateUrl: './array-display.component.html',
  styleUrl: './array-display.component.scss',
})
export class ArrayDisplayComponent {
  model = input<ArrayObjectModel | null>(null);
}
