import { Injectable } from '@angular/core';
import { calculatePassScore, getPassLabel } from '../../utils';
import { SkiPass } from '../../types';
import { BehaviorSubject } from 'rxjs';
import { SkiSet } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class SetsService {
  private setsSubject = new BehaviorSubject<SkiSet[]>([]);
  sets$ = this.setsSubject.asObservable();

  async addSet(set: {
    locationId: number;
    date: Date;
    isTournament: boolean;
    comments: string;
    passes: SkiPass[];
  }) {
    let maxScore = 0;
    let setLabel = '';
    for (const pass of set.passes) {
      const score = calculatePassScore(pass, set.isTournament);
      maxScore = Math.max(score, maxScore);
      if (maxScore === score) {
        setLabel = getPassLabel(pass);
      }
    }
    const id = await (window as any).api.sets.add({
      ...set,
      label: setLabel,
      score: maxScore,
      date: set.date.toISOString(),
      passes: JSON.stringify(set.passes),
    });
    this.setsSubject.next([
      {
        ...set,
        label: setLabel,
        id,
        score: maxScore,
        passes: set.passes,
      },
      ...this.setsSubject.value,
    ]);
  }

  async loadSets() {
    const sets = (await (window as any).api.sets.list()) as any[];
    this.setsSubject.next(sets);
  }
}
