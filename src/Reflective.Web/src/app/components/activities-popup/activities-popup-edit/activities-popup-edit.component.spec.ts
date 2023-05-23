import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPopupEditComponent } from './activities-popup-edit.component';

describe('ActivitiesPopupEditComponent', () => {
  let component: ActivitiesPopupEditComponent;
  let fixture: ComponentFixture<ActivitiesPopupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesPopupEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPopupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
