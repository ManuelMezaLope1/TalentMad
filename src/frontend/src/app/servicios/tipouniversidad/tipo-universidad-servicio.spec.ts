import { TestBed } from '@angular/core/testing';

import { TipoUniversidadServicio } from './tipo-universidad-servicio';

describe('TipoUniversidadServicio', () => {
  let service: TipoUniversidadServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoUniversidadServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
