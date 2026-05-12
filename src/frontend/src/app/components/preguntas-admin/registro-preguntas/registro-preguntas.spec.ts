import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPreguntas } from './registro-preguntas';

describe('RegistroPreguntas', () => {
  let component: RegistroPreguntas;
  let fixture: ComponentFixture<RegistroPreguntas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPreguntas],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPreguntas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
