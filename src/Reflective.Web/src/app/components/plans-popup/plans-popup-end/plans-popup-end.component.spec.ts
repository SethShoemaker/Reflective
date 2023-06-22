import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopupEndComponent } from './plans-popup-end.component';

describe('PlansPopupEndComponent', () => {
  let component: PlansPopupEndComponent;
  let fixture: ComponentFixture<PlansPopupEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopupEndComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopupEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
