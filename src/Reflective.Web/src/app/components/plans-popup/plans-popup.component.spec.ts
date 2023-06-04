import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopupComponent } from './plans-popup.component';

describe('PlansPopupComponent', () => {
  let component: PlansPopupComponent;
  let fixture: ComponentFixture<PlansPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
