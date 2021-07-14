import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';

import { DiscoverPageRoutingModule } from './discover-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
        CommonModule,
        FormsModule,
        DiscoverPageRoutingModule
    ],
    declarations: [DiscoverPage, SearchComponent],
    entryComponents: [SearchComponent]
})
export class DiscoverPageModule {
}
