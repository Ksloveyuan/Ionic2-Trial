import { BrowserModule } from '@angular/platform-browser';
// import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';

import {TabsPage, AboutPage, AboutPopoverPage,AccountPage,
        LoginPage, SignupPage,TutorialPage,SupportPage,
        ClinicianSchedulePage, ClinicianScheduleFilterPage, 
        PatientSchedulePage, ScheduleDetailPage, LockScreenPage} from '../pages';

import { ClinicianDataService } from '../providers/clinician-data';
import { PatientDataService } from '../providers/patient-data';
import { UserData } from '../providers/user-data';
import { NgCalendarModule  } from 'ionic2-calendar';

import { FingerprintAIO } from "@ionic-native/fingerprint-aio";


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AboutPopoverPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ClinicianSchedulePage,
    ClinicianScheduleFilterPage,
    PatientSchedulePage,
    ScheduleDetailPage,
    LockScreenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: PatientSchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: ClinicianSchedulePage, name: 'EventStream', segment: 'eventstream' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: LockScreenPage, name: 'LockScreenPage', segment: 'lockscreen' },
      ]
    }),
    IonicStorageModule.forRoot(),
    NgCalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    SignupPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    ClinicianSchedulePage,
    ClinicianScheduleFilterPage,
    PatientSchedulePage,
    ScheduleDetailPage,
    LockScreenPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ClinicianDataService,
    PatientDataService,
    UserData,
    SplashScreen,
    FingerprintAIO
  ]
})
export class AppModule { }
