import { TestBed } from '@angular/core/testing';

import { UniversidadCarreraServicio } from './universidad-carrera-servicio';

describe('UniversidadCarreraServicio', () => {
  let service: UniversidadCarreraServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadCarreraServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
