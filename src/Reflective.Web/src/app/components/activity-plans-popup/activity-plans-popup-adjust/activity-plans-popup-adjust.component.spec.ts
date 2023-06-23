import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPlansPopupAdjustComponent } from './activity-plans-popup-adjust.component';

describe('ActivityPlansPopupAdjustComponent', () => {
  let component: ActivityPlansPopupAdjustComponent;
  let fixture: ComponentFixture<ActivityPlansPopupAdjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPlansPopupAdjustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPlansPopupAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
