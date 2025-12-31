import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowDown, lucideArrowUp, lucideArrowUpDown } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { type HeaderContext, injectFlexRenderContext } from '@tanstack/angular-table';

@Component({
  imports: [HlmButtonImports, NgIcon, HlmIconImports],
  providers: [provideIcons({ lucideArrowUp, lucideArrowUpDown, lucideArrowDown })],
  template: `
    <button
      hlmBtn
      size="sm"
      variant="ghost"
      (click)="filterClick()"
      [class.capitalize]="header() === ''"
    >
      @let isSorted = this._context.column.getIsSorted();
      {{ _header() }}
      <ng-icon
        hlm
        size="sm"
        [name]="isSorted === 'asc' ? 'lucideArrowUp' : 'lucideArrowDown'"
        [class]="isSorted ? 'opacity-100' : 'opacity-0'"
      />
    </button>
  `,
})
export class TableHeadSortButton<T> {
  protected readonly _context = injectFlexRenderContext<HeaderContext<T, unknown>>();
  protected filterClick() {
    this._context.column.toggleSorting(this._context.column.getIsSorted() === 'asc');
  }
  public readonly header = input('');
  protected readonly _header = computed(() => {
    return this.header() === '' ? this._context.column.id : this.header();
  });
}
