import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListDetailsPage } from './list-details.page';

const routes: Routes = [
    {
        path: '',
        component: ListDetailsPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ListDetailsPageRoutingModule {
}
