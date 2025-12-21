import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { RopeLength } from '../../../types';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NewSetStore } from '../../pages/new-set/new-set.store';
import { BoatSpeedLabel, RopeLengthColors, RopeLengthLabel } from '../../../constants';
import { NgClass } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { map } from 'rxjs';
import { lucideArrowDown, lucideArrowUp, lucidePlus, lucideTrash2 } from '@ng-icons/lucide';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucidePlus, lucideTrash2, lucideArrowUp, lucideArrowDown })],
  templateUrl: './pass-card.html',
})
export class PassCard implements OnInit {
  @Input({ required: true }) group!: FormGroup;
  @Input() index: number = 0;
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;

  @Output() delete = new EventEmitter<void>();
  @Output() moveUp = new EventEmitter<void>();
  @Output() moveDown = new EventEmitter<void>();

  store = inject(NewSetStore);

  protected readonly boatSpeeds = Object.entries(BoatSpeedLabel).reverse();
  protected ropeColor!: WritableSignal<string>;
  protected readonly ropeLengths = Object.entries(RopeLengthLabel);
  ngOnInit(): void {
    const control = this.group.get('ropeLength');
    const initial = control?.value as RopeLength | undefined;
    this.ropeColor = signal(RopeLengthColors[initial ?? RopeLength.L_15_OFF]);
    if (control) {
      control.valueChanges
        .pipe(map((ropeLength) => RopeLengthColors[ropeLength as RopeLength]))
        .subscribe((color: string) => {
          this.ropeColor.set(color);
        });
    }
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
