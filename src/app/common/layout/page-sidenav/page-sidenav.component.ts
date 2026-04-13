import { Component, input, model, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-page-sidenav',
  imports: [
    RouterLink,
    RouterLinkActive,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './page-sidenav.component.html',
  styleUrl: './page-sidenav.component.scss',
})
export class PageSidenavComponent {
  menuItems = input<any[]>([]);
  collapse = model(false);

  readonly appVersion = '1.0.0';

  get toggleIcon() {
    return this.collapse() ? 'chevron_right' : 'chevron_left';
  }
}
