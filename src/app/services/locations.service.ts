import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

  async addLocation(name: string) {
    const id = (await (window as any).api.locations.add(name)) as number;
    this.locationsSubject.next([{ id, name }, ...this.locationsSubject.value]);
  }

  async loadLocations() {
    const locs: Location[] = await (window as any).api.locations.list();
    this.locationsSubject.next(locs);
  }

  async deleteLocation(id: number) {
    await (window as any).api.locations.remove(id);
    this.locationsSubject.next(this.locationsSubject.value.filter((loc) => loc.id !== id));
  }
}
