import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Platform} from '@ionic/angular';
import {from} from 'rxjs';
import {take} from 'rxjs/operators';
import {FirebaseAnalytics} from '@capacitor-firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticsEnabled = true;

  constructor(private router: Router,
              private platform: Platform) {
    // this.initFb();
    // this.router.events.pipe(
    //   filter((e: RouterEvent) => e instanceof NavigationEnd),
    // ).subscribe((e: RouterEvent) => {
    //   console.log('route changed: ', e.url);
    //   this.setScreenName(e.url)
    // });
  }

  async initFb() {
    // if ((await Device.getInfo()).platform == 'web') {
    //   FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    // }
  }

  setUser(userId: string) {
    // Use Firebase Auth uid
    from(this.platform.ready())
      .pipe(take(1))
      .subscribe(readySource => {
          if (readySource !== 'dom') {
            FirebaseAnalytics.setUserId({
              userId: userId,
            });
          }
        }
      );
  }

  setProperty() {
    FirebaseAnalytics.setUserProperty({
      key: "framework",
      value: "angular",
    });
  }

  logEvent() {
    FirebaseAnalytics.logEvent({
      name: "login",
      params: {
        method: "email"
      }
    });
  }

  setScreenName(screenName) {
    from(this.platform.ready())
      .pipe(take(1))
      .subscribe(readySource => {
          if (readySource !== 'dom') {
            FirebaseAnalytics.setCurrentScreen({
              screenName
            });
          }
        }
      );
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setEnabled({
      enabled: this.analyticsEnabled,
    });
  }

}
