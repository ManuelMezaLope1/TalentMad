import { TestBed } from '@angular/core/testing';

import { UniversidadServicio } from './universidad-servicio';

describe('UniversidadServicio', () => {
  let service: UniversidadServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversidadServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
