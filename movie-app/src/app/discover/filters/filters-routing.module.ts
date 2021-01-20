import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomResolverService } from './custom/custom-resolver.service';

import { FiltersPage } from './filters.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersPage
  },
  {
    path: 'custom',
    loadChildren: () => import('./custom/custom.module').then( m => m.CustomPageModule),
    resolve: { result: CustomResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersPageRoutingModule {}
