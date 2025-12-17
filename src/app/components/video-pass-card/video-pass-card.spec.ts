import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPassCard } from './video-pass-card';

describe('VideoPassCard', () => {
  let component: VideoPassCard;
  let fixture: ComponentFixture<VideoPassCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPassCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPassCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
