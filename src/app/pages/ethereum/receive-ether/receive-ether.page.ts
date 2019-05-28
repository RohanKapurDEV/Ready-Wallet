import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';


@Component({
  selector: 'app-receive-ether',
  templateUrl: './receive-ether.page.html',
  styleUrls: ['./receive-ether.page.scss'],
})
export class ReceiveEtherPage implements OnInit {

  address: string = '';

  constructor(private storage: StorageService, private router: Router, private toastController: ToastController, private clipboard: Clipboard) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCurrentWallet()
  }

  getCurrentWallet() {
    this.storage.returnCurrentAddress().then((response: string) => {
      this.address = response;
      console.log(response)
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Address copied',
      duration: 1000,
      showCloseButton: true,
    });
    toast.present(); 
  }

  copyAddressToClipboard() {
    this.storage.returnCurrentAddress().then((response: string) => {
      this.clipboard.copy(response);
    }).then(async () => {
      await this.presentToast();
    })
  }

  goToEtherWallet(){
    this.router.navigateByUrl('/ethereum/etherWallet')
  }

}
