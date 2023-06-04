import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopupCreateComponent } from './plans-popup-create.component';

describe('PlansPopupCreateComponent', () => {
  let component: PlansPopupCreateComponent;
  let fixture: ComponentFixture<PlansPopupCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopupCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
