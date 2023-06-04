import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansPopupListComponent } from './plans-popup-list.component';

describe('PlansPopupListComponent', () => {
  let component: PlansPopupListComponent;
  let fixture: ComponentFixture<PlansPopupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlansPopupListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansPopupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
