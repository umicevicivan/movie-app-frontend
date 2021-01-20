import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverPage } from './discover.page';
import { MovieResolverService } from './movie-details/movie-resolver.service';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
  },
  {
    path: 'movie/:id',
    loadChildren: () => import('./movie-details/movie-details.module').then( m => m.MovieDetailsPageModule),
    resolve: { imovie: MovieResolverService }
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'filters',
    loadChildren: () => import('./filters/filters.module').then( m => m.FiltersPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverPageRoutingModule {}
