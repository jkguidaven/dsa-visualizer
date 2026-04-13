import {
  CUSTOM_ELEMENTS_SCHEMA,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <ts-button
      appearance="ghost"
      size="sm"
      (tsClick)="toggle()"
      [attr.aria-label]="ariaLabel()"
      [attr.title]="ariaLabel()"
    >
      <ts-icon [name]="icon()"></ts-icon>
    </ts-button>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }
    `,
  ],
})
export class ThemeToggleComponent {
  private readonly service = inject(ThemeService);

  readonly icon = computed(() =>
    this.service.theme() === 'dark' ? 'sun' : 'moon'
  );

  readonly ariaLabel = computed(() =>
    this.service.theme() === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode'
  );

  toggle() {
    this.service.toggle();
  }
}
