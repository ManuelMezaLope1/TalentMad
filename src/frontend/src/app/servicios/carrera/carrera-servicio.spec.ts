import { TestBed } from '@angular/core/testing';

import { CarreraServicio } from './carrera-servicio';

describe('CarreraServicio', () => {
  let service: CarreraServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarreraServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
