import { Component } from '@angular/core';

import { NavController } from "ionic-angular";

import { ScheduleDetailPage } from "../schedule-detail/schedule-detail";

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
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };

    constructor(private navCtrl: NavController) {

    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    ionViewDidLoad() {
        this.eventSource = this.createRandomEvents();
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
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev: any) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 100; i += 1) {
            var date = new Date();
            var startDay = Math.floor(Math.random() * 60) - 20;
            var endDay = startDay;
            var startTime;
            var endTime;
            var startMinute = Math.floor(Math.random() * 24 * 60);
            var endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: false,
                doctor: `Doctor ${(i%3)+1}`,
                stage: `stage-${(i%4)+1}`
            });
        }
        return events;
    }
}