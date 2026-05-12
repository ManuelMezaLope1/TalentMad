import { TestBed } from '@angular/core/testing';

import { PreguntasServicio } from './preguntas-servicio';

describe('PreguntasServicio', () => {
  let service: PreguntasServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreguntasServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
