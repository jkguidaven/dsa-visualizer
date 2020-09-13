import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './common/layout/layout.component';

// Angular Material
import {
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  MatDividerModule,
  MatListModule,
  MatButtonModule,
  MatSelectModule,
  MatSliderModule
} from '@angular/material';


import { PageHeaderComponent } from './common/layout/page-header/page-header.component';
import { PageSidenavComponent } from './common/layout/page-sidenav/page-sidenav.component';
import { SortingViewComponent } from './views/sorting-view/sorting-view.component';
import { PathfinderViewComponent } from './views/pathfinder-view/pathfinder-view.component';
import { ArrayDisplayComponent } from './common/components/array-display/array-display.component';
import { FormsModule } from '@angular/forms';
import { GraphDisplayComponent } from './common/components/graph-display/graph-display.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PageHeaderComponent,
    PageSidenavComponent,
    SortingViewComponent,
    PathfinderViewComponent,
    ArrayDisplayComponent,
    GraphDisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
