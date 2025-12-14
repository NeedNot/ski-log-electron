import { Component, inject } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmLabel } from '../../ui/label/src/lib/hlm-label';
import { HlmTextarea } from '@spartan-ng/helm/textarea';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePlus, lucideVideo } from '@ng-icons/lucide';
import { BoatSpeed, RopeLength, SkiPass } from '../../../types';
import { PassCard } from '../../components/pass-card/pass-card';
import { getRopeByIndex, getRopeIndex } from '../../../utils';
import { NewSetStore } from './new-set.store';

@Component({
  selector: 'app-new-set',
  imports: [
    HlmInputImports,
    HlmFieldImports,
    HlmCardImports,
    HlmButtonImports,
    BrnSelectImports,
    HlmSelectImports,
    HlmLabel,
    HlmTextarea,
    HlmButtonImports,
    HlmIcon,
    NgIcon,
    PassCard,
  ],
  providers: [provideIcons({ lucidePlus, lucideVideo }), NewSetStore],
  templateUrl: './new-set.html',
})
export class NewSet {
  store = inject(NewSetStore);
  protected readonly locations = [
    {
      id: 'location-1',
      name: 'Kerman',
    },
    {
      id: 'location-2',
      name: 'Naci',
    },
  ];

  addPass() {
    this.store.addPass();
  }
}
