import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassItem } from './pass-item';

describe('PassItem', () => {
  let component: PassItem;
  let fixture: ComponentFixture<PassItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
