import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SortingViewComponent } from './views/sorting-view/sorting-view.component';
import { PathfinderViewComponent } from './views/pathfinder-view/pathfinder-view.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'sorting',
    pathMatch: 'full'
  },
  {
    path: 'sorting',
    component: SortingViewComponent,
  },
  {
    path: 'pathfinder',
    component: PathfinderViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
