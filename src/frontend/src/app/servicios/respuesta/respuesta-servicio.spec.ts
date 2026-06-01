import { TestBed } from '@angular/core/testing';

import { RespuestaServicio } from './respuesta-servicio';

describe('RespuestaServicio', () => {
  let service: RespuestaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
