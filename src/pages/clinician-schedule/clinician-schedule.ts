export interface ClinicianSchedule {
    title: string,
    startTime: Date,
    endTime: Date,
    allDay: boolean,
    stage: string,
    patient: string,
    doctor: string
}