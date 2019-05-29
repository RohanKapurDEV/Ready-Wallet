import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService, GeneratedWallet } from '../../../services/storage.service';
import { NomicsService } from '../../../services/nomics.service';
import { Web3Service } from '../../../services/web3.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Clipboard } from'@ionic-native/clipboard/ngx';
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
  showTokensForAddress: boolean = false;

  tokensArray = [];

  constructor(private storage: StorageService, private nomics: NomicsService, private web3: Web3Service, private modalController: ModalController,
    private router: Router, private toastController: ToastController, private clipboard: Clipboard) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.setCurrentWalletObject();
    this.web3.checkErc20Balances('0x85670518aC87D858B70329c55140Dc1678f5f37A').then((response) => {
      console.log(response);
      this.tokensArray = response;
      this.showTokensForAddress = true;
    });
  }

  loadOtherSymbol(event) {
    event.target.src ='../../../../assets/icon/load.svg';
  }

  goToReceive() {
    this.router.navigateByUrl('ethereum/etherWallet/receive')
  }
  
  goToSend() {
    this.router.navigateByUrl('ethereum/etherWallet/send')
  }
  
  goToHome() {
    this.router.navigateByUrl('')
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
    }).then(() => {
      this.nomics.getPriceBySymbol('ETH').subscribe((result) => { this.ethereumObject.etherPrice = result[0].price; this.etherDisplayPrice = numeral(result[0].price).format('$ 0,0.00'); })
    }).then(() => {
      this.storage.returnCurrentAddress().then((result) => {
        this.web3.checkEtherBalance(result).then((etherBalance) => {
          this.ethereumObject.walletBalance = this.web3.weiToEther(etherBalance)
        }).then(() => {
          let walletUsdBalance = parseFloat(this.ethereumObject.walletBalance) * parseFloat(this.ethereumObject.etherPrice);
          this.usdDisplayPrice = numeral(walletUsdBalance).format('$ 0,0.00');
        }).then(() => {
          this.showWalletObject = true;
        })
      })
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
}
