import { Component, signal } from '@angular/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { SetsService } from '../../services/sets.service';
import {
  HlmDatePickerImports,
  provideHlmDateRangePickerConfig,
} from '@spartan-ng/helm/date-picker';
import { SetsTable } from '../../components/table/sets-table/sets-table';
import { SkiSet } from '../../../types';

@Component({
  selector: 'app-statistics',
  imports: [HlmTabsImports, HlmDatePickerImports, SetsTable],
  providers: [
    provideHlmDateRangePickerConfig({
      formatDates: (dates: [Date | undefined, Date | undefined]) =>
        dates.map((date) => date?.toLocaleDateString('en-US', { dateStyle: 'short' })).join(' - '),
    }),
  ],
  templateUrl: './statistics.html',
})
export class Statistics {
  protected readonly sets = signal<SkiSet[]>([]);
  protected readonly dateTabs = ['7d', '30d', 'YTD', 'All'];

  protected readonly selectedTab = signal<(typeof this.dateTabs)[number]>('30d');
  protected readonly customRange = signal<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ]);
  protected setsQuery = {};

  constructor(private setsService: SetsService) {
    this.setsQuery = { range: { start: new Date('2025-12-10'), end: new Date() } };
    this.refreshSets();
  }

  async refreshSets() {
    const sets = await this.setsService.loadSets(this.setsQuery);
    this.sets.set(sets);
  }

  dateRangeChange(values: [Date | undefined, Date | undefined]) {
    if (!values[0] || !values[1]) return;
    this.selectedTab.set('');
    this.setsQuery = { ...this.setsQuery, range: { start: values[0], end: values[1] } };
    this.refreshSets();
  }

  tabActivated(tab: (typeof this.dateTabs)[number]) {
    this.selectedTab.set(tab);
    const start = new Date();
    const end = new Date();
    if (tab === '7d') {
      start.setDate(start.getDate() - 7);
    }
    if (tab === '30d') {
      start.setDate(start.getDate() - 30);
    }
    if (tab === 'YTD') {
      start.setMonth(0);
      start.setDate(1);
    }
    this.setsQuery = { ...this.setsQuery, range: { start, end } };
    this.refreshSets();
  }
}
