import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Universidad } from './universidad';

describe('Universidad', () => {
  let component: Universidad;
  let fixture: ComponentFixture<Universidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Universidad],
    }).compileComponents();

    fixture = TestBed.createComponent(Universidad);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
