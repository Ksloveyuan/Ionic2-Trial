import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as dfns from "date-fns";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/range';

@Injectable()
export class PatientDataService {
    patientSchedule: Array<any>;

    getStages(): Array<string> {
        return ["stage-1", "stage-2", "stage-3", "stage-4"];
    }

    getPatientSchedule(): any {
        if (this.patientSchedule) {
            return Observable.of(this.patientSchedule);
        } else {
            var stages = this.getStages();

            return Observable.range(1, 100).map(x => {
                var daySigma = Math.floor(Math.random() * 60) - 20;
                var scheduelDay = dfns.addDays(dfns.startOfToday(), daySigma);
                var startMinuteSigma = Math.floor(Math.random() * 21 * 60);
                var endMinuteSigma = Math.floor(Math.random() * 3 * 60) + startMinuteSigma;

                return {
                    title: `Event - ${x}`,
                    startTime: dfns.addMinutes(scheduelDay, startMinuteSigma),
                    endTime: dfns.addMinutes(scheduelDay, endMinuteSigma),
                    allDay: false,
                    doctor: `Doctor ${(x % 3) + 1}`,
                    stage: stages[x % 4]
                };
            }).reduce((arr, e) => {
                arr.push(e);
                return arr;
            }, []).do(v => {
                this.patientSchedule = v;
            });
        }
    }
}