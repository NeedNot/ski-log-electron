import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Locations } from './pages/locations/locations';
import { NewSet } from './pages/new-set/new-set';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'locations', component: Locations },
  {path: 'new-set', component: NewSet}
];
