import { TestBed } from '@angular/core/testing';

import { UniversidadBecaServicio } from './universidad-beca-servicio';

describe('UniversidadBecaServicio', () => {
  let service: UniversidadBecaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadBecaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
