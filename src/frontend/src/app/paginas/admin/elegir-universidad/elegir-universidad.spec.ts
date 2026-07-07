import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirUniversidad } from './elegir-universidad';

describe('ElegirUniversidad', () => {
  let component: ElegirUniversidad;
  let fixture: ComponentFixture<ElegirUniversidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElegirUniversidad],
    }).compileComponents();

    fixture = TestBed.createComponent(ElegirUniversidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
