import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsPage } from './lists.page';
import { ListResolver } from '../core/resolvers/list.resolver';

const routes: Routes = [
    {
        path: '',
        component: ListsPage,
    },
    {
        path: 'list-details/:name',
        loadChildren: () => import('./list-details/list-details.module').then(m => m.ListDetailsPageModule),
        resolve: {list: ListResolver}

    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsPageRoutingModule {
}
