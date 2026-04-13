import { Component, inject, input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageSidenavComponent } from './page-sidenav/page-sidenav.component';

@Component({
  selector: 'app-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatDividerModule,
    PageHeaderComponent,
    PageSidenavComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  menuItems = input<any[]>([]);
  collapseSidenav = false;

  private router = inject(Router);

  get pageTitle() {
    return this.currentMenuItem.label;
  }

  get pageDescription() {
    return this.currentMenuItem.description;
  }

  private get currentMenuItem() {
    const items = this.menuItems();
    const selected = items.find((item) =>
      this.router.url.startsWith(`/${item.link}`)
    );
    return selected || items[0];
  }
}
