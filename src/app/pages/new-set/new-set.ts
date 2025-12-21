import { Component, inject, OnInit, Signal, ViewChild, viewChild } from '@angular/core';
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
import { BoatSpeed, Location, RopeLength, SkiPass } from '../../../types';
import { PassCard } from '../../components/pass-card/pass-card';
import { getRopeByIndex, getRopeIndex, moveDown, moveUp } from '../../../utils';
import { NewSetStore } from './new-set.store';
import { LocationsService } from '../../services/locations.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  FormControl,
  ɵInternalFormsSharedModule,
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';

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
    ɵInternalFormsSharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucidePlus, lucideVideo }), NewSetStore],
  templateUrl: './new-set.html',
})
export class NewSet implements OnInit {
  protected readonly today = new Date().toLocaleDateString('en-ca');
  protected passForms = new FormArray<FormGroup>([]);
  protected formGroup = new FormGroup({
    date: new FormControl(this.today, { validators: [Validators.required] }),
    location: new FormControl('', { validators: [Validators.required] }), //todo could use the last selected one
    setting: new FormControl('practice', { validators: [Validators.required] }),
    comments: new FormControl(''),
    passes: new FormArray([]),
  });
  store = inject(NewSetStore);
  protected readonly locations: Signal<Location[]>;

  constructor(private locationsService: LocationsService) {
    this.locations = toSignal(
      this.locationsService.locations$.pipe(
        map((locs) => locs.sort((a, b) => a.name.localeCompare(b.name)))
      ),
      { initialValue: [] }
    );
  }

  ngOnInit() {
    this.locationsService.loadLocations();
  }

  addPass() {
    this.store.addPass();
    this.passForms.push(
      new FormGroup({
        boatSpeed: new FormControl(BoatSpeed.MPH_36, { validators: [Validators.required] }),
        ropeLength: new FormControl(RopeLength.L_15_OFF, { validators: [Validators.required] }),
        points: new FormControl(0, {
          validators: [Validators.required, Validators.min(0), Validators.max(6)],
        }),
        comments: new FormControl(''),
      })
    );
  }

  deletePass(index: number) {
    this.passForms.removeAt(index);
  }

  movePassUp(index: number) {
    const passes = this.passForms.value.slice();
    const updated = moveUp(passes, index);
    this.passForms.setValue(updated);
  }

  movePassDown(index: number) {
    const passes = this.passForms.value.slice();
    const updated = moveDown(passes, index);
    this.passForms.setValue(updated);
  }

  clearPasses() {
    this.passForms.clear();
  }

  submit() {
    // validate set
    // validate passes
    // save set
    console.log('sbmit');
  }
}
