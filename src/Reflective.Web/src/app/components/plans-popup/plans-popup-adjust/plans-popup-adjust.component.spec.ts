import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopupAdjustComponent } from './plans-popup-adjust.component';

describe('PlansPopupAdjustComponent', () => {
  let component: PlansPopupAdjustComponent;
  let fixture: ComponentFixture<PlansPopupAdjustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopupAdjustComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopupAdjustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
