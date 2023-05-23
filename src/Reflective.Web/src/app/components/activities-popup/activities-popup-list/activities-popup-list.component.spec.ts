import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesPopupListComponent } from './activities-popup-list.component';

describe('ActivitiesPopupListComponent', () => {
  let component: ActivitiesPopupListComponent;
  let fixture: ComponentFixture<ActivitiesPopupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesPopupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
