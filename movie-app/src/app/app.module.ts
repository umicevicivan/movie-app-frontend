import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TmdbService } from './services/tmdb.service';
import { DateFormaterPipe } from './helpers/date-formater.pipe';
import { HttpRequestInterceptor } from './helpers/interceptors/http-interceptor';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/guard/auth.guard';
import { NewListModalComponent } from './lists/new-list-modal/new-list-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, DateFormaterPipe, NewListModalComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        TmdbService,
        TextToSpeech,
        DateFormaterPipe,
        CookieService,
        AuthGuard,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true}

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
