import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPopupComponent } from './activities-popup.component';

describe('ActivitiesPopupComponent', () => {
  let component: ActivitiesPopupComponent;
  let fixture: ComponentFixture<ActivitiesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
