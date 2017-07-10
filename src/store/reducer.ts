import { IAppState } from "./IAppState";
import * as dfns from "date-fns";
import * as _ from "lodash";

import {
    REQUEST_CLINICIAN_SCHEDULES_SUCCESS,
    FILTER_CLINICIAN_SCHEDULES
} from "../pages/clinician-schedule/clinician-schedule.actions";

const initialState: IAppState = {
    clinicianSchedules: [],
    groupedClinicianSchedules: []
};

function getClinicianSchedules(state, action): IAppState {
    var groupedClinicianSchedules = _.chain(action.data.clinicianSchedules).groupBy(x => {
        return dfns.getHours(x.startTime)
    }).map((v, k) => {
        return {
            header: dfns.addHours(dfns.startOfToday(), k),
            schedules: v
        }
    }).value();

    return Object.assign({}, state, {
        clinicianSchedules: action.data.clinicianSchedules,
        groupedClinicianSchedules
    });
}

function filterClinicianSchedules(state, action) {
    let isMarkedSegment = action.data.segment === "marked";

    _.chain(state.groupedClinicianSchedules).map(group => {
        var updateSchedules = _.map(group.schedules, (schedule) => {
            schedule.hide = (isMarkedSegment && !schedule.marked) || _.indexOf(action.data.excludeStages, schedule.stage) != -1;
            return schedule;
        });
        group.schedules = updateSchedules;
        group.hide = _.every(updateSchedules, "hide");
        return group;
    }).value();

    return Object.assign({}, state);
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_CLINICIAN_SCHEDULES_SUCCESS:
            return getClinicianSchedules(state, action);
        case FILTER_CLINICIAN_SCHEDULES:
            return filterClinicianSchedules(state, action);
        default:
            return state;
    }

}