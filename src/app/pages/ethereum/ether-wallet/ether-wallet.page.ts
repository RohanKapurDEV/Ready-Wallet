import { Component, OnInit } from '@angular/core';
import { StorageService, GeneratedWallet } from '../../../services/storage.service';
import { NomicsService } from '../../../services/nomics.service';
import { Web3Service } from '../../../services/web3.service';
var numeral = require('numeral');

export interface etherObject {
  walletBalance?: string,
  etherPrice?: string
}

@Component({
  selector: 'app-ether-wallet',
  templateUrl: './ether-wallet.page.html',
  styleUrls: ['./ether-wallet.page.scss'],
})
export class EtherWalletPage implements OnInit {

  currentWalletObject: GeneratedWallet = <GeneratedWallet>{};
  ethereumObject: etherObject = {}; // An object that contains the price per ethereum and the Ether balance of the current address
  
  etherDisplayPrice: string;
  usdDisplayPrice: any;

  showWalletObject: boolean = false;

  obj: any = {
    img: '../../../../assets/icon/dai.svg'
  }

  constructor(private storage: StorageService, private nomics: NomicsService, private web3: Web3Service) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.setCurrentWalletObject();
  }

  ionViewDidLeave() {
    this.showWalletObject = false;
  }

  // This function may be the literal definition of callback hell but it works faster than expected on modern devices so fuck it, fuck code optimization anyway
  setCurrentWalletObject() {
    this.storage.returnCurrentAddress().then((response: string) => {
      this.storage.read().then((expectedArray: GeneratedWallet[]) => {
        expectedArray.forEach((walletObj: any) => {
          if (walletObj.wallet_address === response) {
            this.currentWalletObject = walletObj;
          }
        });
      })
    }).then(() => {
      this.nomics.getPriceBySymbol('ETH').subscribe((result) => { this.ethereumObject.etherPrice = result[0].price, this.etherDisplayPrice = numeral(result[0].price).format('$ 0,0.00') })
    }).then(() => {
      this.storage.returnCurrentAddress().then((result) => {
        this.web3.checkEtherBalance(result).then((etherBalance) => {
          this.ethereumObject.walletBalance = this.web3.weiToEther(etherBalance)
        }).then(() => {
          let walletUsdBalance = parseFloat(this.ethereumObject.walletBalance) * parseFloat(this.ethereumObject.etherPrice);
          this.usdDisplayPrice = numeral(walletUsdBalance).format('$ 0,0.00');
          this.showWalletObject = true;
        })
      })
    })
  }

  retreiveErc20Balances() {
    this.storage.returnCurrentAddress().then((response: string) => {
      
    })
  }


}
