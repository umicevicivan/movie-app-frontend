import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OptionsPage } from './options.page';

import { OptionsPageRoutingModule } from './options-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{path: '', component: OptionsPage}]),
        OptionsPageRoutingModule,
    ],
    declarations: [OptionsPage]
})
export class OptionsPageModule {
}
