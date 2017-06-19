import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { AboutPopoverPage } from '../about-popover/about-popover';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public popoverCtrl: PopoverController) { }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(AboutPopoverPage);
    popover.present({ ev: event });
  }
}
