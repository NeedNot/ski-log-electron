import { Component, computed, OnInit, Signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  lucideArrowRight,
  lucideCalendar,
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
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { SetsService } from '../../services/sets.service';
import { toSignal } from '@angular/core/rxjs-interop';
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
  protected readonly monthSets: Signal<SkiSet[]>;
  protected readonly monthBestScore = computed(() =>
    Math.max(...this.monthSets().map((set) => set.score))
  );
  protected readonly openerRate = computed(() =>
    Math.round(
      (this.monthSets().filter((set) => set.passes.at(0)?.points === 6).length /
        this.monthSets().length) *
        100
    )
  );

  constructor(private setsSerice: SetsService) {
    this.monthSets = toSignal(this.setsSerice.monthSets$, { initialValue: [] });
  }

  ngOnInit() {
    this.setsSerice.loadMonthSets();
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
          id: 1,
          boatSpeed: BoatSpeed.MPH_15,
          ropeLength: RopeLength.L_0_OFF,
          points: 6,
        },
      ],
    },
  ];
}
