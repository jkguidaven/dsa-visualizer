import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayDisplayComponent } from './array-display.component';

describe('ArrayDisplayComponent', () => {
  let component: ArrayDisplayComponent;
  let fixture: ComponentFixture<ArrayDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
