import { TestBed } from '@angular/core/testing';

import { OrigenBecaServicio } from './origen-beca-servicio';

describe('OrigenBecaServicio', () => {
  let service: OrigenBecaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrigenBecaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
