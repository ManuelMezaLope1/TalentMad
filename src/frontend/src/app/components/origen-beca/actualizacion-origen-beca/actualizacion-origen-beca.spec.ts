import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizacionOrigenBeca } from './actualizacion-origen-beca';

describe('ActualizacionOrigenBeca', () => {
  let component: ActualizacionOrigenBeca;
  let fixture: ComponentFixture<ActualizacionOrigenBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizacionOrigenBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(ActualizacionOrigenBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
