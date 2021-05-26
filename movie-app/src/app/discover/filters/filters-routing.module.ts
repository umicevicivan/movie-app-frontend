import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilteredMoviesResolver } from 'src/app/helpers/resolvers/filtered.movies.resolver';
import { FiltersPage } from './filters.page';

const routes: Routes = [
    {
        path: '',
        component: FiltersPage
    },
    {
        path: 'custom',
        loadChildren: () => import('./custom/custom.module').then(m => m.CustomPageModule),
        resolve: {filteredMovies: FilteredMoviesResolver}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FiltersPageRoutingModule {
}
