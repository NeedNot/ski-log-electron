import { Component, computed, inject, Input } from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { BoatSpeed, RopeLength } from '../../../types';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NewSetStore } from '../../pages/new-set/new-set.store';
import { BoatSpeedLabel, RopeLengthColors, RopeLengthLabel } from '../../../constants';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-pass-card',
  imports: [
    HlmSelectImports,
    BrnSelectImports,
    HlmCardImports,
    HlmFieldImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmButtonImports,
    HlmIcon,
    NgIcon,
    NgClass,
  ],
  providers: [provideIcons({ lucidePlus })],
  templateUrl: './pass-card.html',
})
export class PassCard {
  @Input() index: number = 0;
  @Input() passId!: string;

  store = inject(NewSetStore);
  pass = computed(() => this.store.passById(this.passId));

  protected readonly boatSpeeds = Object.entries(BoatSpeedLabel);
  protected readonly ropeLengths = Object.entries(RopeLengthLabel);
  protected readonly ropeColor = computed(
    () => RopeLengthColors[this.pass()?.ropeLength ?? RopeLength.L_0_OFF]
  );

  setBoatSpeed(value: BoatSpeed) {
    this.store.updatePass(this.passId, { speed: value });
  }

  setRopeLength(value: RopeLength) {
    this.store.updatePass(this.passId, { ropeLength: value });
  }

  setPoints(value: number) {
    this.store.updatePass(this.passId, { score: value });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    console.log(file);
  }
}
