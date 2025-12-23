import { Component, OnInit, Signal } from '@angular/core';
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
import { Location, SkiPass } from '../../../types';
import { PassCard } from '../../components/pass-card/pass-card';
import { getRopeByIndex, getRopeIndex, moveDown, moveUp } from '../../../utils';
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
import { SetsService } from '../../services/sets.service';
import { BoatSpeed, RopeLength } from '../../../types';

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
  providers: [provideIcons({ lucidePlus, lucideVideo })],
  templateUrl: './new-set.html',
})
export class NewSet implements OnInit {
  protected readonly today = new Date().toLocaleDateString('en-ca');
  protected passForms = new FormArray<FormGroup>([], {
    validators: [Validators.required, Validators.min(1)],
  });
  protected formGroup = new FormGroup({
    date: new FormControl(this.today, { validators: [Validators.required] }),
    location: new FormControl('', { validators: [Validators.required] }), //todo could use the last selected one
    setting: new FormControl('practice', { validators: [Validators.required] }),
    comments: new FormControl(''),
    passes: this.passForms,
  });
  protected readonly locations: Signal<Location[]>;

  constructor(private locationsService: LocationsService, private setsService: SetsService) {
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
    const lastPass = this.passForms.at(-1);
    const didRunLastPass = lastPass?.get('points')?.value === 6;
    const ropeLengthIndex = lastPass ? getRopeIndex(lastPass.get('ropeLength')?.value) : -1;

    const points = new FormControl(0, {
      validators: [Validators.required, Validators.min(0), Validators.max(6)],
    });
    points.valueChanges.subscribe((value) => {
      const snapped = snapToQuarter(Number(value));
      if (snapped !== Number(value)) {
        points.setValue(snapped);
      }
    });
    this.passForms.push(
      new FormGroup({
        boatSpeed: new FormControl(lastPass?.get('boatSpeed')?.value ?? BoatSpeed.MPH_36, {
          validators: [Validators.required],
        }),
        ropeLength: new FormControl(
          didRunLastPass
            ? getRopeByIndex(ropeLengthIndex + 1)
            : lastPass?.get('ropeLength')?.value ?? RopeLength.L_15_OFF,
          { validators: [Validators.required] }
        ),
        points: points,
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
    const formValue = this.formGroup.value;

    const passes: Omit<SkiPass, 'id'>[] = this.passForms.value.map((p: any) => ({
      boatSpeed: p.boatSpeed,
      ropeLength: p.ropeLength,
      points: Number(p.points),
      comments: p.comments ?? '',
    }));

    const dateSplit = formValue.date!.split('-').map(Number);
    this.setsService
      .addSet({
        locationId: Number(formValue.location!),
        date: new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]),
        isTournament: formValue.setting!.toLowerCase() === 'tournament',
        comments: formValue.comments!,
        passes,
      })
      .then(() => {
        this.clearPasses();
        this.formGroup.reset();
      });
  }
}

function snapToQuarter(value: number): number {
  return Math.round(value / 0.25) * 0.25;
}
