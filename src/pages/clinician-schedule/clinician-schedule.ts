import { Component, ViewChild } from '@angular/core';
import { ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from "ionic-angular";
import * as dfns from "date-fns";

import { ScheduleDetailPage, ClinicianScheduleFilterPage } from "../index";
import { ClinicianDataService } from "../../providers/clinician-data";

import * as _ from "lodash";

@Component({
    selector: 'clinician-schedule-page',
    templateUrl: './clinician-schedule.html'
})
export class ClinicianSchedulePage {
    @ViewChild('scheduleList', { read: List }) scheduleList: List;

    viewDate: Date = new Date();
    queryText = '';
    segment = 'all';
    excludeStages: any = [];
    shownGroups: any = 0;
    rawData: any;
    groups: any = [];

    constructor(public loadingCtrl: LoadingController,
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        public toastCtrl: ToastController,
        public clinicianDataService: ClinicianDataService) {
    }

    ionViewDidLoad() {
        this.updateSchedule();
    }

    updateSchedule() {
        // Close any open sliding items when the schedule updates
        this.scheduleList && this.scheduleList.closeSlidingItems();

        if (!this.rawData) {
            this.clinicianDataService.getTodoList().subscribe(data => {
                this.rawData = _.chain(data).groupBy(x => {
                    return dfns.getHours(x.startTime)
                }).map((v, k) => {
                    return {
                        header: dfns.addHours(dfns.startOfToday(), k),
                        schedules: v
                    }
                }).value();

                this.groups = this.rawData;
                this.shownGroups = this.groups.length;
            });
        } else {
            let isMarkedSegment = this.segment === "marked";

            this.groups = _.chain(this.rawData).map(group => {
                var updateSchedules = _.map(group.schedules, (schedule) => {
                    schedule.hide = (isMarkedSegment && !schedule.marked) || _.indexOf(this.excludeStages,schedule.stage) != -1;
                    return schedule;
                });
                group.schedules = updateSchedules;
                group.hide = _.every(updateSchedules, "hide");
                return group;
            }).value();
            
            this.shownGroups = _.chain(this.groups).filter("hide").size();
        }
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