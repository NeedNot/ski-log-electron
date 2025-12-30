import { Component, Input } from '@angular/core';
import { SkiPass } from '../../../../types';
import { getPassLabel } from '../../../../utils';
import { BoatSpeedLabel, RopeLengthLabel } from '../../../../constants';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideVideo } from '@ng-icons/lucide';
import { HlmTableImports } from '@spartan-ng/helm/table';

@Component({
  selector: 'app-pass-table',
  imports: [HlmIconImports, NgIcon, HlmTableImports],
  providers: [provideIcons({ lucideVideo })],
  templateUrl: './pass-table.html',
})
export class PassTable {
  @Input({ required: true }) passes!: SkiPass[];

  constructor() {
    console.log(this.passes);
  }

  get data() {
    return this.passes.map((pass) => ({
      label: getPassLabel(pass),
      points: pass.points,
      speedLabel: BoatSpeedLabel[pass.boatSpeed],
      ropeLengthLabel: RopeLengthLabel[pass.ropeLength],
    }));
  }
}
