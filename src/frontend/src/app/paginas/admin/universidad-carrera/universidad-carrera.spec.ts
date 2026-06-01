import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadCarrera } from './universidad-carrera';

describe('UniversidadCarrera', () => {
  let component: UniversidadCarrera;
  let fixture: ComponentFixture<UniversidadCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversidadCarrera],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversidadCarrera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
