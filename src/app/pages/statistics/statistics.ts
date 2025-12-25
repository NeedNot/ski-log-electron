import { Component, Signal } from '@angular/core';
import { HlmTableContainer, HlmTable } from '@spartan-ng/helm/table';
import { SetsService } from '../../services/sets.service';
import { SkiSet } from '../../../types';
import { toSignal } from '@angular/core/rxjs-interop';
import { SetsTable } from '../../components/table/sets-table/sets-table';

@Component({
  selector: 'app-statistics',
  imports: [SetsTable],
  templateUrl: './statistics.html',
})
export class Statistics {
  filteredSets: Signal<SkiSet[]>;
  constructor(private setsService: SetsService) {
    this.setsService.loadSets();
    this.filteredSets = toSignal(this.setsService.sets$, { initialValue: [] });
  }
}
