import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Beca } from './beca';

describe('Beca', () => {
  let component: Beca;
  let fixture: ComponentFixture<Beca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Beca],
    }).compileComponents();

    fixture = TestBed.createComponent(Beca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
