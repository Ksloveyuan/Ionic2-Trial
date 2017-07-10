import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { ScheduleDetailPage } from "../schedule-detail/schedule-detail";
import { PatientDataService } from "../../providers/patient-data";
import * as dfns from "date-fns";

@Component({
    selector: 'patient-schedule-page',
    templateUrl: './patient-schedule.html'
})
export class PatientSchedulePage {
    eventSource: any;
    viewTitle: any;
    segment: string = "month";

    isToday:boolean;
    
    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    constructor(private navCtrl: NavController, private patientDataService: PatientDataService) {

    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    ionViewDidLoad() {
        this.patientDataService.getPatientSchedule().subscribe(data=>{
            this.eventSource = data;
        });
    }

    onViewTitleChanged(title: any) {
        this.viewTitle = title;
    }

    onEventSelected(event: any) {
        this.navCtrl.push(ScheduleDetailPage, {
          scheduleDetail: event
        });
    }

    today() {
        this.calendar.currentDate = dfns.startOfToday();
    }

    onTimeSelected(ev: any) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        this.isToday = dfns.isToday(event);
    }
}