import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirUniversidadBeca } from './elegir-universidad-beca';

describe('ElegirUniversidadBeca', () => {
  let component: ElegirUniversidadBeca;
  let fixture: ComponentFixture<ElegirUniversidadBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirUniversidadBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(ElegirUniversidadBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
