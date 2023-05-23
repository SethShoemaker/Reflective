import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPopupRemoveConfirmationComponent } from './activities-popup-remove-confirmation.component';

describe('ActivitiesPopupRemoveConfirmationComponent', () => {
  let component: ActivitiesPopupRemoveConfirmationComponent;
  let fixture: ComponentFixture<ActivitiesPopupRemoveConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesPopupRemoveConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPopupRemoveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
