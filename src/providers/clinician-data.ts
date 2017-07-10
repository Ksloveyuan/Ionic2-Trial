import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClinicianSchedule } from "../pages/clinician-schedule/clinician-schedule";

import * as dfns from "date-fns";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';

@Injectable()
export class ClinicianDataService {
    clinicalSchedules: Array<ClinicianSchedule>;

    getStages():Array<string>{
        return ["stage-1","stage-2","stage-3","stage-4"];
    }

    getClinicianSchedules(): any{
        if (this.clinicalSchedules) {
            return Observable.of(this.clinicalSchedules);
        } else {
            var startTime = dfns.addHours(dfns.startOfToday(), 8);
            var endTime;
            var stages = this.getStages();
            return Observable.range(1, 100).map(x=>{
                endTime = dfns.addMinutes(startTime, 5);
                var index = Math.floor(Math.random() * 4);
                var event: ClinicianSchedule = {
                        title: 'Event - ' + x,
                        startTime: startTime,
                        endTime: endTime,
                        allDay: false,
                        stage: stages[index],
                        patient: `Patient ${(x%10)+1}`,
                        doctor: `Doctor ${(x%3)+1}`
                    };
                startTime = endTime;
                return event;
            }).reduce((arr,e)=>{
                arr.push(e);
                return arr;
            }, []).do(v=>{
                this.clinicalSchedules = v;
            });
            
        }
    }
}