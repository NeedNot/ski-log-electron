import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRow } from './set-row';

describe('SetRow', () => {
  let component: SetRow;
  let fixture: ComponentFixture<SetRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
