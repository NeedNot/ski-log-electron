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
  async loadSets(query: SetsQuery = {}) {
    return await (window as any).api.sets.list(query);
  }

  async addSet(set: SkiSetFormValue) {
    let maxScore = 0;
    let maxIndex = 0;
    let setLabel = '';
    for (let index = 0; index < set.passes.length; index++) {
      const pass = set.passes[index];
      const score = calculatePassScore(pass, set.isTournament);
      maxScore = Math.max(score, maxScore);
      if (score === maxScore) {
        maxIndex = index;
        setLabel = getPassLabel(pass);
      }
    }

    await (window as any).api.sets.add({
      location_id: set.locationId,
      date: set.date.toISOString(),
      best_index: maxIndex,
      best_score: maxScore,
      is_tournament: set.isTournament ? 1 : 0,
      score: maxScore,
      passes: JSON.stringify(set.passes),
      comments: set.comments,
      opening_pass: calculatePassScore({ ...set.passes[0], points: 6 }, false),
    });
  }
}
