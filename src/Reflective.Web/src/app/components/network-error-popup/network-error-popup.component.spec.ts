import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkErrorPopupComponent } from './network-error-popup.component';

describe('NetworkErrorPopupComponent', () => {
  let component: NetworkErrorPopupComponent;
  let fixture: ComponentFixture<NetworkErrorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkErrorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkErrorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
