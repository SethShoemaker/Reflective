import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAndEndTimeInputComponent } from './start-and-end-time-input.component';

describe('StartAndEndTimeInputComponent', () => {
  let component: StartAndEndTimeInputComponent;
  let fixture: ComponentFixture<StartAndEndTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartAndEndTimeInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartAndEndTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
