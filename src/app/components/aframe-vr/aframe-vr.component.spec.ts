import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AframeVrComponent } from './aframe-vr.component';

describe('AframeVrComponent', () => {
  let component: AframeVrComponent;
  let fixture: ComponentFixture<AframeVrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AframeVrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AframeVrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
