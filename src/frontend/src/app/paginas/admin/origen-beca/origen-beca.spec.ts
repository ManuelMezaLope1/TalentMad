import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigenBeca } from './origen-beca';

describe('OrigenBeca', () => {
  let component: OrigenBeca;
  let fixture: ComponentFixture<OrigenBeca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrigenBeca],
    }).compileComponents();

    fixture = TestBed.createComponent(OrigenBeca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
