import { Component } from '@angular/core';
import { ViewController, NavController } from "ionic-angular";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';

@Component({
  selector: 'lock-screen',
  templateUrl: './lock-screen.html'
})
export class LockScreenPage {
  constructor(private viewCtrl: ViewController,
    private navController: NavController,
    private faio: FingerprintAIO) {

  }

  goBackToRoot(){
   this.navController.setRoot('LoginPage'); 
  }

  ionViewDidLoad() {
    this.faio.show({
      clientId: 'Ionic Trail',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true  //Only for Android(optional)
    })
    .then((result: any) => {
      if (result) {
        this.viewCtrl.dismiss();
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
  }
}