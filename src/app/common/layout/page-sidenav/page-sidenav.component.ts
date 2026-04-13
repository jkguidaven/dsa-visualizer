import { CUSTOM_ELEMENTS_SCHEMA, Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-sidenav',
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './page-sidenav.component.html',
  styleUrl: './page-sidenav.component.scss',
})
export class PageSidenavComponent {
  menuItems = input<any[]>([]);

  private router = inject(Router);

  isActive(link: string): boolean {
    return this.router.url.startsWith(`/${link}`);
  }
}
