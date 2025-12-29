import { Injectable, signal } from '@angular/core';
import { calculatePassScore, getPassLabel } from '../../utils';
import { SkiPass } from '../../types';
import { SkiSet } from '../../types';
import type { SetsQuery } from '../../shared/types';

type SkiSetFormValue = {
  locationId: number;
  date: Date;
  isTournament: boolean;
  comments: string;
  passes: SkiPass[];
};

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  private readonly cache = new Map<string, SkiSet[]>();
  private readonly _sets = signal<SkiSet[]>([]);
  private readonly sets = this._sets.asReadonly();

  async loadSets(query: SetsQuery = {}) {
    return await (window as any).api.sets.list(query);
  }

  async addSet(set: SkiSetFormValue) {
    let maxScore = 0;
    let setLabel = '';
    for (const pass of set.passes) {
      const score = calculatePassScore(pass, set.isTournament);
      maxScore = Math.max(score, maxScore);
      if (maxScore === score) {
        setLabel = getPassLabel(pass);
      }
    }
    await (window as any).api.sets.add({
      ...set,
      label: setLabel,
      score: maxScore,
      date: set.date.toISOString(),
      passes: JSON.stringify(set.passes),
    });
    this.invalidateAll();
  }

  invalidateAll() {
    this.cache.clear();
  }
}
