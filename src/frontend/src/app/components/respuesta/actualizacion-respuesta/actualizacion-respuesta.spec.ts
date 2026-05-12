import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionRespuesta } from './actualizacion-respuesta';

describe('ActualizacionRespuesta', () => {
  let component: ActualizacionRespuesta;
  let fixture: ComponentFixture<ActualizacionRespuesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionRespuesta],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionRespuesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
