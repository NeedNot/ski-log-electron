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
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { SetsService } from '../../services/sets.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { LocationsService } from '../../services/locations.service';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { ScoreChart } from '../../components/charts/score-chart/score-chart';

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
    ScoreChart,
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
  protected readonly monthSets$: Observable<SkiSet[]>;
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
      label: string;
      location: string;
      month: string;
      day: string;
      score: number;
      isTournament: boolean;
      passes: number;
    }[]
  >;

  constructor(private setsSerice: SetsService, private locationService: LocationsService) {
    this.monthSets$ = Observable.create(() => {});
    locationService.loadLocations();
    this.recentSets = toSignal(
      combineLatest([this.monthSets$, this.locationService.locations$]).pipe(
        map(([sets, locations]) => {
          const locationsMap = new Map(locations.map((loc) => [loc.id, loc.name]));
          return sets.slice(0, 4).map((set) => ({
            id: set.id,
            label: set.label,
            location: locationsMap.get(set.locationId)!,
            month: new Date(set.date).toLocaleDateString('en-US', { month: 'short' }),
            day: new Date(set.date).toLocaleDateString('en-US', { day: 'numeric' }),
            score: set.score,
            isTournament: set.isTournament,
            passes: set.passes.length,
          }));
        })
      ),
      { initialValue: [] }
    );
    this.monthSets = toSignal(this.monthSets$, { initialValue: [] });
  }

  ngOnInit() {
    this.setsSerice.loadSets();
  }
}
