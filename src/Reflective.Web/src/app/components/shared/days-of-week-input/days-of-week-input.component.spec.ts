import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysOfWeekInputComponent } from './days-of-week-input.component';

describe('DaysOfWeekInputComponent', () => {
  let component: DaysOfWeekInputComponent;
  let fixture: ComponentFixture<DaysOfWeekInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaysOfWeekInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaysOfWeekInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
