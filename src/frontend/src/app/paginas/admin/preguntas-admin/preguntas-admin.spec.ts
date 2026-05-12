import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntasAdmin } from './preguntas-admin';

describe('PreguntasAdmin', () => {
  let component: PreguntasAdmin;
  let fixture: ComponentFixture<PreguntasAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntasAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntasAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
