import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionUniversidad } from './actualizacion-universidad';

describe('ActualizacionUniversidad', () => {
  let component: ActualizacionUniversidad;
  let fixture: ComponentFixture<ActualizacionUniversidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionUniversidad],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionUniversidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
