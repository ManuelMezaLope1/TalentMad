import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadBeca } from './universidad-beca';

describe('UniversidadBeca', () => {
  let component: UniversidadBeca;
  let fixture: ComponentFixture<UniversidadBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniversidadBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(UniversidadBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
