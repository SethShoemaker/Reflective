import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPlansPopupComponent } from './activity-plans-popup.component';

describe('ActivityPlansPopupComponent', () => {
  let component: ActivityPlansPopupComponent;
  let fixture: ComponentFixture<ActivityPlansPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPlansPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPlansPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
