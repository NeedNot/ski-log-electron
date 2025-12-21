import { Component, inject, NgZone, OnInit, Signal, signal } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMapPin, lucidePlus, lucideTrash2 } from '@ng-icons/lucide';
import { BrnAlertDialogImports } from '@spartan-ng/brain/alert-dialog';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIcon, HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { Observable } from 'rxjs';
import { Location } from '../../../types';
import { LocationsService } from '../../services/locations.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
export class Locations implements OnInit {
  private _locationToDelete: number | null = null;
  protected readonly _showDeleteConfirmationDialog = signal<'open' | 'closed'>('closed');

  protected readonly locations: Signal<Location[]>;
  protected newLocationControl!: FormControl<string>;

  constructor(private locationsService: LocationsService) {
    this.locations = toSignal(this.locationsService.locations$, { initialValue: [] });
  }

  ngOnInit() {
    this.locationsService.loadLocations();
    this.newLocationControl = new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, this.duplicateLocationValidator()],
    });
  }

  duplicateLocationValidator() {
    return (control: AbstractControl) => {
      const value = control.value?.trim().toLowerCase();
      const exists = this.locations().some((loc) => loc.name.toLowerCase() === value);

      return exists ? { duplicate: true } : null;
    };
  }

  addLocation() {
    if (this.newLocationControl.invalid) return;

    const value = this.newLocationControl.value.trim();
    this.locationsService.addLocation(value);
    this.newLocationControl.reset();
  }

  deleteLocation(id: number) {
    this._locationToDelete = id;
    this._showDeleteConfirmationDialog.set('open');
  }

  confirmDeleteLocation() {
    this.locationsService.deleteLocation(this._locationToDelete as number);
    this._showDeleteConfirmationDialog.set('closed');
    this._locationToDelete = null;
  }

  closeDialog() {
    this._showDeleteConfirmationDialog.set('closed');
    this._locationToDelete = null;
  }
}
