import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSet } from './new-set';

describe('NewSet', () => {
  let component: NewSet;
  let fixture: ComponentFixture<NewSet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
