import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: any[] = [
    {
      label: 'Sorting Algorithm',
      description:
        'A Sorting Algorithm is used to rearrange a given array or list elements according ' +
        'to a comparison operator on the elements. The comparison operator is used to decide ' +
        'the new order of element in the respective data structure.',
      icon: 'dashboard',
      link: 'sorting'
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
