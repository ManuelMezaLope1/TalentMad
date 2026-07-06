import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionUniversidadBeca } from './actualizacion-universidad-beca';

describe('ActualizacionUniversidadBeca', () => {
  let component: ActualizacionUniversidadBeca;
  let fixture: ComponentFixture<ActualizacionUniversidadBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionUniversidadBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionUniversidadBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
