import { Component, Input, signal } from '@angular/core';
import { SkiSet } from '../../../../types';
import { BoatSpeedLabel, RopeLengthLabel } from '../../../../constants';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { PassTable } from '../pass-table/pass-table';
import { Table, FlexRender } from '@tanstack/angular-table';

@Component({
  selector: 'app-sets-table',
  imports: [HlmTableImports, PassTable, FlexRender],
  templateUrl: './sets-table.html',
})
export class SetsTable {
  @Input({ required: true }) table!: Table<SkiSet>;
}
