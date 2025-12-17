import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
  lucideTrendingDown,
  lucideTrendingUp,
} from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BoatSpeed, RopeLength, SetType, SkiSet } from '../../../types';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { VideoPassCard } from "../../components/video-pass-card/video-pass-card";

@Component({
  selector: 'app-home',
  imports: [
    HlmCardImports,
    NgIcon,
    HlmIcon,
    HlmSelectImports,
    BrnSelectImports,
    HlmBadgeImports,
    HlmItemImports,
    VideoPassCard
],
  providers: [
    provideIcons({ lucideCalendar, lucideTrendingUp, lucideTrendingDown, lucideArrowRight }),
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly _recentSets: SkiSet[] = [
    {
      id: '1',
      date: new Date().toISOString(),
      locationId: '1',
      type: SetType.PRACTICE,
      score: 90,
      passes: [
        {
          id: '1',
          setId: '1',
          speed: BoatSpeed.MPH_15,
          ropeLength: RopeLength.L_0_OFF,
          score: 6,
        },
      ],
    },
    {
      id: '2',
      date: new Date().toISOString(),
      locationId: '1',
      type: SetType.PRACTICE,
      score: 90,
      passes: [
        {
          id: '1',
          setId: '1',
          speed: BoatSpeed.MPH_15,
          ropeLength: RopeLength.L_0_OFF,
          score: 6,
        },
      ],
    },
  ];
}
