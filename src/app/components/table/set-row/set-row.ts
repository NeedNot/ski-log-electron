import { Component, Input } from '@angular/core';
import { SkiSet } from '../../../../types';

@Component({
  selector: 'tr[setRow]',
  imports: [],
  templateUrl: './set-row.html',
})
export class SetRow {
  @Input() set!: SkiSet & { formattedDate: string; wentOutAt: string };
  @Input() expanded = false;
}
