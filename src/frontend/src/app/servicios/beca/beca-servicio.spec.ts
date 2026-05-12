import { TestBed } from '@angular/core/testing';

import { BecaServicio } from './beca-servicio';

describe('BecaServicio', () => {
  let service: BecaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BecaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
