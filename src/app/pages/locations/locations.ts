import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMapPin, lucidePlus, lucideTrash, lucideTrash2 } from '@ng-icons/lucide';
import {
  BrnAlertDialog,
  BrnAlertDialogImports,
  BrnAlertDialogTrigger,
} from '@spartan-ng/brain/alert-dialog';
import { BrnDialogState } from '@spartan-ng/brain/dialog';
import { HlmAlertDialog, HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmScrollAreaImports } from '@spartan-ng/helm/scroll-area';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-locations',
  imports: [
    HlmItemImports,
    HlmButtonImports,
    HlmIconImports,
    HlmInputImports,
    NgIcon,
    HlmIcon,
    ReactiveFormsModule,
    HlmSeparatorImports,
    HlmAlertDialogImports,
    BrnAlertDialogImports,
  ],
  templateUrl: './locations.html',
  providers: [provideIcons({ lucideMapPin, lucidePlus, lucideTrash2 })],
})
export class Locations {
  private _locationToDelete: string | null = null;
  protected readonly _showDeleteConfirmationDialog = signal<'open' | 'closed'>('closed');
  locations = [
    {
      id: 'location-1',
      name: 'Kerman lake',
    },
  ];

  newLocationControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, this.duplicateLocationValidator()],
  });

  duplicateLocationValidator() {
    return (control: AbstractControl) => {
      const value = control.value?.trim().toLowerCase();
      const exists = this.locations.some((loc) => loc.name.toLowerCase() === value);

      return exists ? { duplicate: true } : null;
    };
  }

  addLocation() {
    if (this.newLocationControl.invalid) return;

    const value = this.newLocationControl.value.trim();
    this.locations.push({
      id: `location-${this.locations.length + 1}`,
      name: value,
    });
    this.newLocationControl.reset();
  }

  deleteLocation(id: string) {
    this._locationToDelete = id;
    this._showDeleteConfirmationDialog.set('open');
  }

  confirmDeleteLocation() {
    this.locations = this.locations.filter((loc) => loc.id !== this._locationToDelete);
    this._showDeleteConfirmationDialog.set('closed');
  }

  closeDialog() {
    this._showDeleteConfirmationDialog.set('closed');
    this._locationToDelete = null;
  }
  // todo fix the dialog
  // 1. ctx.close() doesn't callback any close functions so you can't tell when it closes
  // 2. dismissing outside the dialog doesn't callback any close functions
}
