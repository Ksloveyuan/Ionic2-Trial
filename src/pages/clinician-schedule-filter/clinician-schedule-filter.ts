import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ClinicianDataService } from "../../providers/clinician-data";

@Component({
    selector: 'clinician-schedule-filter-page',
    templateUrl: './clinician-schedule-filter.html',
})
export class ClinicianScheduleFilterPage {
  stages: Array<{name: string, isChecked: boolean}>;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public clinicianDataService :ClinicianDataService
  ) {
    // passed in array of track names that should be excluded (unchecked)
    let excludedStageNames = this.navParams.data;
    var theStages = [];
    this.clinicianDataService.getStages().forEach(x=>{
        theStages.push({
        name: x,
        isChecked: (excludedStageNames.indexOf(x) === -1)
      });
    });
    this.stages = theStages;
  }

  resetFilters() {
    this.stages.forEach(stage => {
      stage.isChecked = true;
    });
  }

  applyFilters() {
    let excludedTrackNames = this.stages.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    this.viewCtrl.dismiss(data);
  }
}
