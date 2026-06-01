import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCategoriaPreguntas } from './registro-categoria-preguntas';

describe('RegistroCategoriaPreguntas', () => {
  let component: RegistroCategoriaPreguntas;
  let fixture: ComponentFixture<RegistroCategoriaPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCategoriaPreguntas],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCategoriaPreguntas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
