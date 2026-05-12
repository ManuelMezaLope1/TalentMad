import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionBeca } from './actualizacion-beca';

describe('ActualizacionBeca', () => {
  let component: ActualizacionBeca;
  let fixture: ComponentFixture<ActualizacionBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
