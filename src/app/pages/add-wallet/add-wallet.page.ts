import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, GeneratedWallet } from '../../services/storage.service';
import { Web3Service } from '../../services/web3.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {

  walletName: string = '';

  walletTypes: string[] = ['Bitcoin', 'Ethereum'];
  selectedType: string = 'Bitcoin';

  TOS1: boolean = false;
  TOS3: boolean = false;

  constructor(private router: Router, private web3: Web3Service, private storage: StorageService) { }

  ngOnInit() {
  }

  backToHomeScreen() {
    this.router.navigateByUrl('/landing')
  }

  // addWalletToStorage() { // Temporary function - doesn't take into account Radio Button
  //   let name = this.walletName;
  //   let wallet: GeneratedWallet = this.web3.createWallet(name);
  //   this.storage.create(wallet).then(() => {
  //     this.router.navigateByUrl('/landing');
  //   })
  // }

  addWalletToStorage() {
    if (this.selectedType === 'Ethereum') {
      let name = this.walletName;
      let wallet: GeneratedWallet = this.web3.createWallet(name);
      this.storage.create(wallet).then(() => {
        this.router.navigateByUrl('/landing');
      })
    } else if (this.selectedType === 'Bitcoin') {
      console.log('Add btc functionality first');
    }
  }
}
