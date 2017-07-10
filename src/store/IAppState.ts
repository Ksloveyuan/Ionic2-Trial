import { ClinicianSchedule } from "../pages/clinician-schedule/clinician-schedule";

export interface IAppState{
    clinicianSchedules: ClinicianSchedule[],
    groupedClinicianSchedules: any[]
}