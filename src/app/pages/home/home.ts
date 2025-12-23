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
import { calculatePassScore, calculatePassTitle } from '../../../utils';
import { LocationsService } from '../../services/locations.service';
import { combineLatest, map } from 'rxjs';

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
    Math.max(...this.monthSets().map((set) => set.score), 0)
  );
  protected readonly openerRate = computed(
    () =>
      Math.round(
        (this.monthSets().filter((set) => set.passes.at(0)?.points === 6).length /
          this.monthSets().length) *
          100
      ) || 0
  );

  protected readonly recentSets!: Signal<
    {
      id: number;
      title: string;
      location: string;
      month: string;
      day: string;
      score: number;
      isTournament: boolean;
      passes: number;
    }[]
  >;

  constructor(private setsSerice: SetsService, private locationService: LocationsService) {
    locationService.loadLocations();
    this.recentSets = toSignal(
      combineLatest([this.setsSerice.monthSets$, this.locationService.locations$]).pipe(
        map(([sets, locations]) => {
          const locationsMap = new Map(locations.map((loc) => [loc.id, loc.name]));
          return sets.slice(0, 4).map((set) => {
            let maxScore = 0;
            let title = '';
            set.passes.forEach((pass) => {
              const s = calculatePassScore(pass, set.isTournament);
              if (s > maxScore) {
                maxScore = s;
                title = calculatePassTitle(pass);
              }
            });
            return {
              id: set.id,
              title,
              location: locationsMap.get(set.locationId)!,
              month: new Date(set.date).toLocaleDateString('en-US', { month: 'short' }),
              day: new Date(set.date).toLocaleDateString('en-US', { day: 'numeric' }),
              score: maxScore,
              isTournament: set.isTournament,
              passes: set.passes.length,
            };
          });
        })
      ),
      { initialValue: [] }
    );
    this.monthSets = toSignal(this.setsSerice.monthSets$, { initialValue: [] });
  }

  ngOnInit() {
    this.setsSerice.loadMonthSets();
  }
}
