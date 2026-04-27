import { TestBed } from '@angular/core/testing';

import { NivelinteresServicio } from './nivelinteres-servicio';

describe('NivelinteresServicio', () => {
  let service: NivelinteresServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelinteresServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
