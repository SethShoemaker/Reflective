import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPlansPopupCreateComponent } from './activity-plans-popup-create.component';

describe('ActivityPlansPopupCreateComponent', () => {
  let component: ActivityPlansPopupCreateComponent;
  let fixture: ComponentFixture<ActivityPlansPopupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPlansPopupCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPlansPopupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
