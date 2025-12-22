import { Component, OnInit, signal, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
  lucidePlug,
  lucidePlus,
  lucideTrendingDown,
  lucideTrendingUp,
  lucideWind,
} from '@ng-icons/lucide';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { SkiSet } from '../../../types';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { VideoPassCard } from '../../components/video-pass-card/video-pass-card';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmButton, HlmButtonImports } from '@spartan-ng/helm/button';
import { SetsService } from '../../services/sets.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { BoatSpeed, RopeLength, SetSetting } from '../../../types';

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
    VideoPassCard,
    HlmEmptyImports,
    HlmButtonImports,
  ],
  providers: [
    provideIcons({
      lucideCalendar,
      lucideTrendingUp,
      lucideTrendingDown,
      lucideArrowRight,
      lucideWind,
      lucidePlus,
    }),
  ],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly numberOfSets: Signal<number>;

  constructor(private setsSerice: SetsService) {
    this.numberOfSets = toSignal(this.setsSerice.sets$.pipe(map((sets) => sets.length)), {
      initialValue: 0,
    });
  }

  ngOnInit() {
    this.setsSerice.loadSets();
  }

  protected readonly _recentSets: SkiSet[] = [
    {
      id: '1',
      date: new Date().toISOString(),
      locationId: 1,
      setting: SetSetting.PRACTICE,
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
      locationId: 2,
      setting: SetSetting.PRACTICE,
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
