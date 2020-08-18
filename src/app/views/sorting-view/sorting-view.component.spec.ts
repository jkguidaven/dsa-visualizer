import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingViewComponent } from './sorting-view.component';

describe('SortingViewComponent', () => {
  let component: SortingViewComponent;
  let fixture: ComponentFixture<SortingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
