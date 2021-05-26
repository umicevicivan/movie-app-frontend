import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TmdbService} from './services/tmdb.service';
import {DateFormaterPipe} from './helpers/date-formater.pipe';
import {HttpRequestInterceptor} from './helpers/interceptors/http-interceptor';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

@NgModule({
    declarations: [AppComponent, DateFormaterPipe],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        TmdbService,
        TextToSpeech,
        DateFormaterPipe,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
