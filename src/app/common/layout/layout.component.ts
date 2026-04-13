import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { PageSidenavComponent } from './page-sidenav/page-sidenav.component';
import { ThemeToggleComponent } from '../theme-toggle.component';

@Component({
  selector: 'app-layout',
  imports: [PageSidenavComponent, ThemeToggleComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
