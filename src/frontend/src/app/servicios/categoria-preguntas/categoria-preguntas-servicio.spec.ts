import { TestBed } from '@angular/core/testing';

import { CategoriaPreguntasServicio } from './categoria-preguntas-servicio';

describe('CategoriaPreguntasServicio', () => {
  let service: CategoriaPreguntasServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaPreguntasServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
