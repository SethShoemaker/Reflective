import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPopupCreateComponent } from './activities-popup-create.component';

describe('ActivitiesPopupCreateComponent', () => {
  let component: ActivitiesPopupCreateComponent;
  let fixture: ComponentFixture<ActivitiesPopupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesPopupCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPopupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
