import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCarrera } from './registro-carrera';

describe('RegistroCarrera', () => {
  let component: RegistroCarrera;
  let fixture: ComponentFixture<RegistroCarrera>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroCarrera],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroCarrera);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
