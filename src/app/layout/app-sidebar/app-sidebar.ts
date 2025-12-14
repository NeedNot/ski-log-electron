import { Component } from '@angular/core';
import { provideIcons, NgIcon } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideHouse,
  lucideInbox,
  lucideLocate,
  lucideMapPin,
  lucidePlus,
  lucideSearch,
  lucideSettings,
} from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

@Component({
  selector: 'app-sidebar',
  imports: [HlmSidebarImports, NgIcon, HlmIcon],
  templateUrl: './app-sidebar.html',
  providers: [
    provideIcons({
      lucideHouse,
      lucideMapPin,
      lucidePlus
    }),
  ],
})
export class AppSidebar {
  protected readonly _items = [
    {
      title: 'Home',
      url: '/',
      icon: 'lucideHouse',
    },
    {
      title: 'Locations',
      url: '/locations',
      icon: 'lucideMapPin',
    },
    {
      title: 'Create Set',
      url: '/new-set',
      icon: 'lucidePlus'
    }
  ];
}
