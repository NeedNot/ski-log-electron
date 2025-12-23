import { Component, Input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
  lucideMapPin,
  lucidePause,
  lucidePlay,
} from '@ng-icons/lucide';
import { VideoPlayer } from '../video-player/video-player';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { SkiPass } from '../../../types';
import { BoatSpeedLabel, RopeLengthColors, RopeLengthLabel } from '../../../constants';

@Component({
  selector: 'app-video-pass-card',
  imports: [HlmCardImports, VideoPlayer, HlmIcon, NgIcon, HlmBadgeImports],
  templateUrl: './video-pass-card.html',
  providers: [
    provideIcons({ lucidePause, lucidePlay, lucideMapPin, lucideCalendar, lucideArrowRight }),
  ],
})
export class VideoPassCard {
  @Input() date!: string;
  @Input() pass!: SkiPass;

  get day() {
    return new Date(this.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  get speed() {
    return BoatSpeedLabel[this.pass.boatSpeed];
  }

  get ropeLength() {
    return RopeLengthLabel[this.pass.ropeLength];
  }

  get ropeColor() {
    return RopeLengthColors[this.pass.ropeLength];
  }
}
