import { Component, OnInit } from '@angular/core';
import { GeneratedWallet, StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-ether-trade',
  templateUrl: './ether-trade.page.html',
  styleUrls: ['./ether-trade.page.scss'],
})
export class EtherTradePage implements OnInit {

  currentWalletObject: any;

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
