import { Component, Input } from '@angular/core';
import { SkiPass } from '../../../../types';
import { BoatSpeedLabel, RopeLengthLabel } from '../../../../constants';
import { calculatePassTitle } from '../../../../utils';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCamera, lucideVideo } from '@ng-icons/lucide';
import { HlmButton, HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-pass-item',
  imports: [HlmIcon, NgIcon, HlmButtonImports],
  providers: [provideIcons({ lucideVideo })],
  templateUrl: './pass-item.html',
})
export class PassItem {
  @Input() index: number = 0;
  @Input({ required: true }) pass!: SkiPass;

  get title() {
    return calculatePassTitle(this.pass);
  }

  get speed() {
    return BoatSpeedLabel[this.pass.boatSpeed];
  }

  get ropeLength() {
    return RopeLengthLabel[this.pass.ropeLength];
  }
}
