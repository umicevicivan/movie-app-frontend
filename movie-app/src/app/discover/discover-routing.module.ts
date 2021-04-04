import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieResolver } from '../helpers/resolvers/movie.resolver';
import { DiscoverPage } from './discover.page';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
  },
  {
    path: 'movie/:id',
    loadChildren: () => import('./movie-details/movie-details.module').then( m => m.MovieDetailsPageModule),
    resolve: {movie: MovieResolver}
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
