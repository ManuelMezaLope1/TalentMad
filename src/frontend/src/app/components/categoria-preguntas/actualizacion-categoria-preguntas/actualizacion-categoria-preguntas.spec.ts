import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionCategoriaPreguntas } from './actualizacion-categoria-preguntas';

describe('ActualizacionCategoriaPreguntas', () => {
  let component: ActualizacionCategoriaPreguntas;
  let fixture: ComponentFixture<ActualizacionCategoriaPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionCategoriaPreguntas],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionCategoriaPreguntas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
