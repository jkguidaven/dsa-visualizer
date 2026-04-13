import { Routes } from '@angular/router';
import { SortingViewComponent } from './views/sorting-view/sorting-view.component';
import { PathfinderViewComponent } from './views/pathfinder-view/pathfinder-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sorting', pathMatch: 'full' },
  { path: 'sorting', component: SortingViewComponent },
  { path: 'pathfinder', component: PathfinderViewComponent },
];
