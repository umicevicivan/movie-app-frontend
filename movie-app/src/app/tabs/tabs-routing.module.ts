import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lists',
        loadChildren: () => import('../lists/lists.module').then(m => m.ListsPageModule)
      },
      {
        path: 'discover',
        loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverPageModule)
      },
      {
        path: 'options',
        loadChildren: () => import('../options/options.module').then(m => m.OptionsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/discover',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/discover',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
