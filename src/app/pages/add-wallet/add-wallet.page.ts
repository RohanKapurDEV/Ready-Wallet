import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {

  walletName: string = '';
  iPhoneXDetected: boolean = false;

  walletTypes: string[] = ['Bitcoin', 'Ethereum'];
  selectedType: string;

  agreementForm = [
    {
      agreement: "I understand the fact that Ready Labs does not record, hold, or collect the private keys associated with my wallets",
      val: false
    },
    {
      agreement: "I have thoroughly read, and have agreed to the Terms & Conditions and Privacy Policy",
      val: false
    },
    {
      agreement: "I will make a backup of my private keys after the wallet is created through the options tab inside the wallet interface",
      val: false
    }
  ]

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkModernAppleVariants();
    console.log('x')
  }

  backToHomeScreen() {
    this.router.navigateByUrl('/landing')
  }

  checkModernAppleVariants() {
    let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    let ratio = window.devicePixelRatio || 1;
    let screen = {
      width: window.screen.width * ratio,
      height: window.screen.height * ratio
    };

    if (iOS && screen.width == 1125 && screen.height === 2436) {
      this.iPhoneXDetected = true;
      console.log('iPhone X detected');
      document.getElementById('notch').style.height="1em";
    } else {
      this.iPhoneXDetected = false;
      console.log('iPhone X not detected')
    }
  }

}
