import {Component} from '@angular/core';
import {AnalyticsService} from './analytics.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private analyticsService: AnalyticsService) {
    this.analyticsService.setScreenName('TEST');
  }

}
