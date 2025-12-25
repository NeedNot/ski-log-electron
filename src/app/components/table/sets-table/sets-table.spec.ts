import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsTable } from './sets-table';

describe('SetsTable', () => {
  let component: SetsTable;
  let fixture: ComponentFixture<SetsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
