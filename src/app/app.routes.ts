import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Locations } from './pages/locations/locations';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'locations', component: Locations },
];
