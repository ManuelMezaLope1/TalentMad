import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesUniversidad } from './sedes-universidad';

describe('SedesUniversidad', () => {
  let component: SedesUniversidad;
  let fixture: ComponentFixture<SedesUniversidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedesUniversidad],
    }).compileComponents();

    fixture = TestBed.createComponent(SedesUniversidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
