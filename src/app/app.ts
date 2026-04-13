import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './common/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  menuItems: any[] = [
    {
      label: 'Sorting Algorithm',
      description:
        'A Sorting Algorithm is used to rearrange a given array or list elements according ' +
        'to a comparison operator on the elements. The comparison operator is used to decide ' +
        'the new order of element in the respective data structure.',
      icon: 'dashboard',
      link: 'sorting',
    },
    {
      label: 'Pathfinder Algorithm',
      icon: 'dashboard',
      link: 'pathfinder',
      description:
        'Pathfinding algorithms are usually an attempt to solve the shortest path problem in graph theory.',
    },
  ];
}
