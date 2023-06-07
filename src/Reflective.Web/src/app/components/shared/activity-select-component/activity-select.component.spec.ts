import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySelectComponent } from './activity-select.component';

describe('ActivitySelectComponentComponent', () => {
  let component: ActivitySelectComponent;
  let fixture: ComponentFixture<ActivitySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
