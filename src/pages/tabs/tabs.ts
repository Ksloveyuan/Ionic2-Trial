import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import {PatientSchedulePage} from '../patient-schedule/patient-schedule';
import {ClinicianSchedulePage} from '../clinician-schedule/clinician-schedule.component';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
   selectedTabIndex: number;

   tabCalenderRoot: any = PatientSchedulePage;
   tabEventStreamRoot: any = ClinicianSchedulePage;

  constructor(navParams: NavParams) {
    this.selectedTabIndex = navParams.data.tabIndex || 0;
  }

}
