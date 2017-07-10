import { NgRedux } from "ng2-Redux";
import { IAppState } from "../../store/IAppState";
import { Injectable } from "@angular/core";
import { ClinicianDataService } from "../../providers/clinician-data";

export const FILTER_CLINICIAN_SCHEDULES = "courses/FILTER";
export const REQUEST_CLINICIAN_SCHEDULES_SUCCESS = "courses/REQUEST_COURESES_SUCCESS";

@Injectable()
export class ClinicianScheduleActions {

    constructor(private ngRedux: NgRedux<IAppState>,
        private clinicianDataService: ClinicianDataService) {

    }

    getClinicianSchedules() {
        this.clinicianDataService.getClinicianSchedules().subscribe((clinicianSchedules) => {
            this.ngRedux.dispatch({
                type: REQUEST_CLINICIAN_SCHEDULES_SUCCESS,
                data: {clinicianSchedules}
            });
        });
    }

    filterGroupedClinicianSchedules(segment, excludeStages){
        this.ngRedux.dispatch({
                type: FILTER_CLINICIAN_SCHEDULES,
                data: {segment, excludeStages}
            });
    }

}