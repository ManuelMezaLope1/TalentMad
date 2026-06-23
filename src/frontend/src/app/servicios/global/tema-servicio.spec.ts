import { TestBed } from '@angular/core/testing';

import { TemaServicio } from './tema-servicio';

describe('TemaServicio', () => {
  let service: TemaServicio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemaServicio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
