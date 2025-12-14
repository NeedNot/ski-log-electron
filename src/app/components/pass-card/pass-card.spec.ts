import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCard } from './pass-card';

describe('PassCard', () => {
  let component: PassCard;
  let fixture: ComponentFixture<PassCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
