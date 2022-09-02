import {Injectable, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoConfig,
  TranslocoLoader,
  TranslocoModule
} from '@ngneat/transloco';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HTTP} from '@awesome-cordova-plugins/http/ngx';

@Injectable({providedIn: 'root'})
export class HttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {
  }

  getTranslation(langPath: string) {
    return this.http.get<Translation>(`/assets/i18n/${langPath}.json`);
  }
}

export const httpLoader = {provide: TRANSLOCO_LOADER, useClass: HttpLoader};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      hardwareBackButton: false,
      backButtonText: ''
    }), // https://ionicframework.com/docs/angular/config
    AppRoutingModule,
    TranslocoModule,
    HttpClientModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    httpLoader,
    HTTP,
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['cs', 'en'],
        reRenderOnLangChange: true,
        fallbackLang: 'cs',
        defaultLang: 'cs'
      } as TranslocoConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
