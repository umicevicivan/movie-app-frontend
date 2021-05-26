import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieDetailsPage } from './movie-details.page';

const routes: Routes = [
    {
        path: '',
        component: MovieDetailsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MovieDetailsPageRoutingModule {
}
