import { Component } from '@angular/core';
import {Platform} from '@ionic/angular';
import {from, timer} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {SplashScreen} from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then((readySource) => {
      timer(1000).pipe(
        switchMap(_ => from(SplashScreen.hide())),
        take(1)
      ).subscribe(() => {
          console.log('SplashScreen hidden');
        }
      );
    });

  }
}
