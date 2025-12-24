import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import {
  LineSeriesModule,
  NumberAxisModule,
  CategoryAxisModule,
  TimeAxisModule,
  ModuleRegistry,
} from 'ag-charts-community';

ModuleRegistry.registerModules([
  LineSeriesModule,
  NumberAxisModule,
  CategoryAxisModule,
  TimeAxisModule,
]);
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
