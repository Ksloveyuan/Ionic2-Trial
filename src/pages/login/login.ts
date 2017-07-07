import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ModalController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

import { LockScreenPage } from '../lock-screen/lock-screen';

import { FingerprintAIO } from '@ionic-native/fingerprint-aio';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: { username?: string, password?: string } = {};
  submitted = false;
  hasLoggedIn: boolean = false;

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userData: UserData,
    private faio: FingerprintAIO) {
    this.userData.hasLoggedIn().then(loggedIn => {
      this.hasLoggedIn = loggedIn;
    }).catch(err => {
      this.hasLoggedIn = false;
      console.log(err);
    });
  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  startTouchID() {
    this.faio.show({
      clientId: 'Ionic Trail',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true  //Only for Android(optional)
    })
      .then((result: any) => {
        if (result) {
          this.navCtrl.push(TabsPage);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

}
