import { Injectable } from '@angular/core';
import { calculatePassScore, calculatePassTitle } from '../../utils';
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
    let bestPass = '';
    for (const pass of set.passes) {
      const score = calculatePassScore(pass, set.isTournament);
      maxScore = Math.max(score, maxScore);
      if (maxScore === score) {
        bestPass = calculatePassTitle(pass);
      }
    }
    const id = await (window as any).api.sets.add({
      ...set,
      bestPass,
      score: maxScore,
      date: set.date.toISOString(),
      passes: JSON.stringify(set.passes),
    });
    this.setsSubject.next([
      {
        ...set,
        bestPass,
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
