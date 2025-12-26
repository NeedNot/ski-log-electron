import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassTable } from './pass-table';

describe('PassTable', () => {
  let component: PassTable;
  let fixture: ComponentFixture<PassTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
