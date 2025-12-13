import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';
import { AppSidebar } from './layout/app-sidebar/app-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HlmSidebarImports, AppSidebar],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ski-log-electron');
}
