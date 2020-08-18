import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathfinderViewComponent } from './pathfinder-view.component';

describe('PathfinderViewComponent', () => {
  let component: PathfinderViewComponent;
  let fixture: ComponentFixture<PathfinderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathfinderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathfinderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
