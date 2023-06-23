import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPlansPopupEndComponent } from './activity-plans-popup-end.component';

describe('ActivityPlansPopupEndComponent', () => {
  let component: ActivityPlansPopupEndComponent;
  let fixture: ComponentFixture<ActivityPlansPopupEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPlansPopupEndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPlansPopupEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
