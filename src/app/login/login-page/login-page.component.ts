import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslocoService} from '@ngneat/transloco';
import {AnalyticsService} from '../../service/analytics.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private translocoService: TranslocoService,
              private modalController: ModalController,
              private analyticsService: AnalyticsService) {

  }

  tryAnalytics() {
    this.analyticsService.setScreenName('Login Page');
  }


}
