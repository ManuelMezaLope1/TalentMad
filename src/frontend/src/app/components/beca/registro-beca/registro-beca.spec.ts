import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroBeca } from './registro-beca';

describe('RegistroBeca', () => {
  let component: RegistroBeca;
  let fixture: ComponentFixture<RegistroBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
