import { Component, OnInit } from '@angular/core';
import { StorageService, GeneratedWallet } from '../../../services/storage.service'

@Component({
  selector: 'app-ether-wallet',
  templateUrl: './ether-wallet.page.html',
  styleUrls: ['./ether-wallet.page.scss'],
})
export class EtherWalletPage implements OnInit {

  currentWalletObject: GeneratedWallet;

  constructor(private storage: StorageService) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.setCurrentWalletObject();
  }

  setCurrentWalletObject() {
    this.storage.returnCurrentAddress().then((response: string) => {
      this.storage.read().then((expectedArray: GeneratedWallet[]) => {
        expectedArray.forEach((walletObj: any) => {
          if (walletObj.wallet_address === response) {
            this.currentWalletObject = walletObj;
          }
        });
      })
    }).then(() => { // Initiate callback hell here

    })
  }


}
