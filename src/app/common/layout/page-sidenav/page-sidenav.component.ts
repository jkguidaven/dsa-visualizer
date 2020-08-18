import { Component, OnInit, Input, Output } from '@angular/core';
import { version } from '../../../../../package.json';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-sidenav',
  templateUrl: './page-sidenav.component.html',
  styleUrls: ['./page-sidenav.component.scss'],
})
export class PageSidenavComponent implements OnInit {
  @Output() collapseChange: EventEmitter<boolean> = new EventEmitter();
  @Input() menuItems: any[] = [];
  collapseValue: boolean;

  constructor() {}

  ngOnInit() {}

  @Input()
  get collapse() {
    return this.collapseValue;
  }

  set collapse(value) {
    this.collapseValue = value;
    this.collapseChange.emit(this.collapseValue);
  }

  get appVersion() {
    return version;
  }

  get toggleIcon() {
    return this.collapse ? 'chevron_right' : 'chevron_left';
  }
}
