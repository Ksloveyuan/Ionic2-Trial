import { Component } from '@angular/core';
import { NavParams  } from "ionic-angular";

@Component({
    selector: 'schedule-detail-page',
    templateUrl: './schedule-detail.html'
})
export class ScheduleDetailPage {

    scheduleDetail: any;
    scheduleDetialTitle: string;
    startTime: Date;

    constructor(private navParams: NavParams) {
        this.scheduleDetail = this.navParams.data.scheduleDetail;
        this.scheduleDetialTitle = this.scheduleDetail.title;
        this.startTime = this.scheduleDetail.startTime;
     }

}