import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraBeca } from './carrera-beca';

describe('CarreraBeca', () => {
  let component: CarreraBeca;
  let fixture: ComponentFixture<CarreraBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(CarreraBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
