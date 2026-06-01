import { TestBed } from '@angular/core/testing';

import { CarreraBecaServicio } from './carrera-beca-servicio';

describe('CarreraBecaServicio', () => {
  let service: CarreraBecaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreraBecaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
