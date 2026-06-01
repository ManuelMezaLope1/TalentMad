import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUniversidad } from './registro-universidad';

describe('RegistroUniversidad', () => {
  let component: RegistroUniversidad;
  let fixture: ComponentFixture<RegistroUniversidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroUniversidad],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroUniversidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
