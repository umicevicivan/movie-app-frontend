import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsPage } from './lists.page';

import { ListsPageRoutingModule } from './lists-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
        CommonModule,
        FormsModule,
        ListsPageRoutingModule
    ],
    declarations: [ListsPage]
})
export class ListsPageModule {
}
