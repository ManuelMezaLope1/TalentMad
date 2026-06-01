import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionCarrera } from './actualizacion-carrera';

describe('ActualizacionCarrera', () => {
  let component: ActualizacionCarrera;
  let fixture: ComponentFixture<ActualizacionCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionCarrera],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionCarrera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
