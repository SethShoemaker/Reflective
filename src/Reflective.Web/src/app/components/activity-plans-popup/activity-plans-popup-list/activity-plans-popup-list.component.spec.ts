import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPlansPopupListComponent } from './activity-plans-popup-list.component';

describe('ActivityPlansPopupListComponent', () => {
  let component: ActivityPlansPopupListComponent;
  let fixture: ComponentFixture<ActivityPlansPopupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPlansPopupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityPlansPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
