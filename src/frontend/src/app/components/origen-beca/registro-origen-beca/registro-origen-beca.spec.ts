import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroOrigenBeca } from './registro-origen-beca';

describe('RegistroOrigenBeca', () => {
  let component: RegistroOrigenBeca;
  let fixture: ComponentFixture<RegistroOrigenBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroOrigenBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroOrigenBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
