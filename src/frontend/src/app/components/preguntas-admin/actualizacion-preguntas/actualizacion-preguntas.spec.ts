import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionPreguntas } from './actualizacion-preguntas';

describe('ActualizacionPreguntas', () => {
  let component: ActualizacionPreguntas;
  let fixture: ComponentFixture<ActualizacionPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionPreguntas],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionPreguntas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
