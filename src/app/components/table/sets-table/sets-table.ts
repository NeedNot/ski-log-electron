import { Component, Input, signal } from '@angular/core';
import { SkiSet } from '../../../../types';
import { BoatSpeedLabel, RopeLengthLabel } from '../../../../constants';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { PassTable } from '../pass-table/pass-table';

@Component({
  selector: 'app-sets-table',
  imports: [HlmTableImports, PassTable],
  templateUrl: './sets-table.html',
})
export class SetsTable {
  [x: string]: any;
  @Input() sets: SkiSet[] = [];

  protected selectedIndex = signal(-1);

  get setsData() {
    return this.sets.map((set) => {
      const year = set.date.getFullYear();
      const localeOptions: Intl.DateTimeFormatOptions =
        new Date().getFullYear() === year
          ? { month: 'short', day: 'numeric' }
          : { month: 'short', day: 'numeric', year: 'numeric' };

      return {
        ...set,
        formattedDate: set.date.toLocaleString('en-US', localeOptions),
        wentOutAt: `${RopeLengthLabel[set.passes[0].ropeLength]} @ ${
          BoatSpeedLabel[set.passes[0].boatSpeed]
        }`,
      };
    });
  }

  toggle(index: number) {
    this.selectedIndex.set(index === this.selectedIndex() ? -1 : index);
  }
}
