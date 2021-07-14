import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from './core/interceptors/http-interceptor';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './core/auth/auth.guard';
import { NewListModalComponent } from './lists/new-list-modal/new-list-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent, NewListModalComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        CoreModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        TextToSpeech,
        CookieService,
        AuthGuard,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
