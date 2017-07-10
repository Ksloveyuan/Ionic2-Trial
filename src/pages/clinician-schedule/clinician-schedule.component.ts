import { Component, ViewChild } from '@angular/core';
import { ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from "ionic-angular";
import { ScheduleDetailPage, ClinicianScheduleFilterPage } from "../index";

import { select } from "ng2-Redux";
import { Observable } from "rxjs/Observable";

import { ClinicianScheduleActions } from "./clinician-schedule.actions";

@Component({
    selector: 'clinician-schedule-page',
    templateUrl: './clinician-schedule.component.html'
})
export class ClinicianSchedulePage {
    @ViewChild('scheduleList', { read: List }) scheduleList: List;
    @select('groupedClinicianSchedules') groupedClinicianSchedules$: Observable<any> ;

    segment = 'all';
    excludeStages: any = [];
    shownGroups: any = 1;

    constructor(public loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public clinicianScheduleActions: ClinicianScheduleActions) {
    }

    ionViewDidLoad() {
        this.clinicianScheduleActions.getClinicianSchedules();
    }

    updateSchedule() {
        // Close any open sliding items when the schedule updates
        this.scheduleList && this.scheduleList.closeSlidingItems();
        this.clinicianScheduleActions.filterGroupedClinicianSchedules(this.segment, this.excludeStages);
    }

    presentFilter() {
        let modal = this.modalCtrl.create(ClinicianScheduleFilterPage, this.excludeStages);
        modal.present();

        modal.onWillDismiss((data: any[]) => {
            if (data) {
                this.excludeStages = data;
                this.updateSchedule();
            }
        });

    }

    goToScheduleDetail(scheduleDetail: any) {
        this.navCtrl.push(ScheduleDetailPage, {
            scheduleDetail
        });
    }

    markSchedule(slidingItem: ItemSliding, scheduleDetail: any) {
        scheduleDetail.marked = true;
        const toast = this.toastCtrl.create({
            message: `${scheduleDetail.title} marked`,
            duration: 1000
        });
        toast.present();
        slidingItem.close();
    }

    unmarkSchedule(slidingItem: ItemSliding, scheduleDetail: any) {
        scheduleDetail.marked = false;
        const toast = this.toastCtrl.create({
            message: `${scheduleDetail.title} unmarked`,
            duration: 1000
        });
        toast.present();
        slidingItem.close();
    }

    doRefresh(refresher: Refresher) {
        setTimeout(() => {
            refresher.complete();

            const toast = this.toastCtrl.create({
                message: 'Schedules have been updated.',
                duration: 1000
            });
            toast.present();
        }, 1000);
    }
}