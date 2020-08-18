import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  collapseSidenav: boolean;
  @Input() menuItems: any[];

  constructor(private router: Router) { }

  get pageTitle() {
    return this.currentMenuItem.label;
  }

  get pageDescription() {
    return this.currentMenuItem.description;
  }

  private get currentMenuItem() {
    const selected = this.menuItems.find((item) => this.router.url.startsWith(`/${item.link}`));
    return selected || this.menuItems[0];
  }
}
