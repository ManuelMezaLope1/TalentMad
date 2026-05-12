import { TestBed } from '@angular/core/testing';

import { DepartamentoServicio } from './departamento-servicio';

describe('DepartamentoServicio', () => {
  let service: DepartamentoServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartamentoServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
