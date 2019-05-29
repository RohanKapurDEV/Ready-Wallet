import { Component, OnInit } from '@angular/core';
import { GeneratedWallet, StorageService } from '../../../services/storage.service';


@Component({
  selector: 'app-ether-buy',
  templateUrl: './ether-buy.page.html',
  styleUrls: ['./ether-buy.page.scss'],
})
export class EtherBuyPage implements OnInit {

  currentWalletObject: GeneratedWallet = <GeneratedWallet>{};

  constructor(private storage: StorageService) { }

  ngOnInit() {
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
    })
  }
}
