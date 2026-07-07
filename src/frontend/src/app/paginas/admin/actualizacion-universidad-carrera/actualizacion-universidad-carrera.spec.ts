import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionUniversidadCarrera } from './actualizacion-universidad-carrera';

describe('ActualizacionUniversidadCarrera', () => {
  let component: ActualizacionUniversidadCarrera;
  let fixture: ComponentFixture<ActualizacionUniversidadCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionUniversidadCarrera],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionUniversidadCarrera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
