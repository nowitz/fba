import {Component, QueryList, ViewChildren} from '@angular/core';
import {AlertController, IonRouterOutlet, MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@capacitor/splash-screen';
import {Location, LocationStrategy} from '@angular/common';
import {App} from '@capacitor/app';
import {Router} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';
import {from, timer} from 'rxjs';
import {switchMap, take} from 'rxjs/operators';
import {StatusBar} from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private location: Location,
    private translocoService: TranslocoService,
    private alertController: AlertController,
    private router: Router,
    private locationStrategy: LocationStrategy
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then((readySource) => {


      // Use matchMedia to check the user preference
      // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      // this.changeStyleMode(prefersDark.matches);
      //
      // // Listen for changes to the prefers-color-scheme media query
      // prefersDark.addListener((mediaQuery) => this.changeStyleMode(mediaQuery.matches));

      if (readySource !== 'dom') { //OTEVRENO V NATIVNI APLIKACE

//         App.getInfo().then(x => console.log(x));
//         App.getState().then(x => console.log(x));
//         App.getLaunchUrl().then(x => console.log(x));

        // Nejspis bylo nutne zakazat pres parametr hardwareBackButton: false!
        App.addListener('backButton', ({canGoBack}) => {
          this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
            const isOpenMenu = await this.menu.isOpen();
            if (isOpenMenu) {
              await this.menu.close();
            } else if (this.router.url === '/login') {
              await this.presentAlertConfirm();
            } else if (canGoBack) {
              // await this.location.back();
              this.locationStrategy.historyGo(-1);
            } else {
              await this.presentAlertConfirm();
            }
            // else if (this.router.url !== '/main/tabs/tab1') {
            //   // await this.router.navigate(['/tabs/tab1']);
            //   await this.location.back();
            // }
          });
        });
        StatusBar.setBackgroundColor({color: '#0e52a0'});
        // https://forum.ionicframework.com/t/capacitor-cordova-splash-screen-delay/189340/25
        timer(1000).pipe(
          switchMap(_ => from(SplashScreen.hide())),
          take(1)
        ).subscribe(() => {
            console.log('SplashScreen hidden');
          }
        );
      }
    });
  }

  private changeStyleMode(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }

  async presentAlertConfirm() {
    const titles = this.translocoService.translate(['EXIT_APP', 'CANCEL', 'OK']);
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: titles[0],
      buttons: [{
        text: titles[1],
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: titles[2],
        handler: () => {
          App.exitApp();
        }
      }]
    });

    await alert.present();
  }

}
