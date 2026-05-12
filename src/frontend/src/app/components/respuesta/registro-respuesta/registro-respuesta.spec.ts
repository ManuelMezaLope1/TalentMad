import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRespuesta } from './registro-respuesta';

describe('RegistroRespuesta', () => {
  let component: RegistroRespuesta;
  let fixture: ComponentFixture<RegistroRespuesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroRespuesta],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroRespuesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
