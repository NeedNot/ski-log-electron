import { Component, computed, signal } from '@angular/core';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { SetsService } from '../../services/sets.service';
import {
  HlmDatePickerImports,
  provideHlmDateRangePickerConfig,
} from '@spartan-ng/helm/date-picker';
import { SetsTable } from '../../components/table/sets-table/sets-table';
import { SkiSet } from '../../../types';
import { HlmPaginationImports } from '@spartan-ng/helm/pagination';
import {
  ColumnDef,
  createAngularTable,
  getCoreRowModel,
  PaginationState,
} from '@tanstack/angular-table';
import { BoatSpeedLabel, RopeLengthLabel } from '../../../constants';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import {
  lucideChevronLeft,
  lucideChevronRight,
  lucideChevronsLeft,
  lucideChevronsRight,
} from '@ng-icons/lucide';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { SetsQuery, SkiSetsResponse } from '../../../shared/types';

const defaultColumns: ColumnDef<SkiSet>[] = [
  {
    accessorKey: 'date',
    cell: (info) => {
      const value = info.getValue() as Date | undefined;
      if (!value) return '';

      const year = value.getFullYear();
      const localeOptions: Intl.DateTimeFormatOptions =
        new Date().getFullYear() === year
          ? { month: 'short', day: 'numeric' }
          : { month: 'short', day: 'numeric', year: 'numeric' };

      return value.toLocaleDateString('en-US', localeOptions);
    },
    footer: (info) => info.column.id,
  },
  {
    accessorKey: 'label',
    cell: (info) => info.getValue(),
    header: 'Best pass',
  },
  {
    accessorFn: (row) =>
      `${RopeLengthLabel[row.passes[0].ropeLength]} @ ${BoatSpeedLabel[row.passes[0].boatSpeed]}`,
    cell: (info) => info.getValue(),
    header: 'Went out at',
  },
  {
    accessorKey: 'score',
    cell: (info) => info.getValue(),
    header: 'Score',
  },
  {
    accessorKey: 'passes',
    cell: (info) => (info.getValue() as SkiSet[]).length,
    header: 'Passes',
  },
];

@Component({
  selector: 'app-statistics',
  imports: [
    HlmTabsImports,
    HlmDatePickerImports,
    SetsTable,
    HlmPaginationImports,
    BrnSelectImports,
    NgIcon,
    HlmSelectImports,
    HlmIconImports,
    HlmButtonImports,
  ],
  providers: [
    provideIcons({
      lucideChevronLeft,
      lucideChevronRight,
      lucideChevronsLeft,
      lucideChevronsRight,
    }),
    provideHlmDateRangePickerConfig({
      formatDates: (dates: [Date | undefined, Date | undefined]) =>
        dates.map((date) => date?.toLocaleDateString('en-US', { dateStyle: 'short' })).join(' - '),
    }),
  ],
  templateUrl: './statistics.html',
})
export class Statistics {
  protected readonly dateTabs = ['7d', '30d', 'YTD', 'All'];

  protected readonly selectedTab = signal<(typeof this.dateTabs)[number]>('30d');
  protected readonly customRange = signal<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ]);
  protected setsQuery: SetsQuery = {};
  protected setsResponse = signal<SkiSetsResponse | null>(null);

  protected readonly _sets = computed(() => this.setsResponse()?.sets ?? []);
  protected readonly _pagination = signal<PaginationState>({
    pageSize: 2,
    pageIndex: 0,
  });
  protected readonly _pageCount = computed(() => this.setsResponse()?.totalPages ?? 0);

  table = createAngularTable(() => ({
    data: this._sets(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
    enableMultiRowSelection: false,
    manualPagination: true,
    onPaginationChange: (updater) => {
      updater instanceof Function
        ? this._pagination.update(updater)
        : this._pagination.set(updater);
      this.refreshSets();
    },
    pageCount: this._pageCount(),
    state: {
      pagination: this._pagination(),
    },
  }));

  constructor(private setsService: SetsService) {
    this.setsQuery = { range: { start: new Date('2025-12-10'), end: new Date() } };
    this.refreshSets();
  }

  async refreshSets() {
    const response = await this.setsService.loadSets({
      ...this.setsQuery,
      page: this._pagination().pageIndex,
    });
    this.setsResponse.set(response);
  }

  dateRangeChange(values: [Date | undefined, Date | undefined]) {
    if (!values[0] || !values[1]) return;
    this.selectedTab.set('');
    this.setsQuery = { ...this.setsQuery, range: { start: values[0], end: values[1] } };
    this.table.setPageIndex(0);
    this.refreshSets();
  }

  tabActivated(tab: (typeof this.dateTabs)[number]) {
    this.selectedTab.set(tab);
    const start = new Date();
    const end = new Date();
    if (tab === '7d') {
      start.setDate(start.getDate() - 7);
    } else if (tab === '30d') {
      start.setDate(start.getDate() - 30);
    } else if (tab === 'YTD') {
      start.setMonth(0);
      start.setDate(1);
    }
    const range = tab === 'All' ? undefined : { start, end };

    this.setsQuery = { ...this.setsQuery, range };
    this.table.setPageIndex(0);
    this.refreshSets();
  }
}
