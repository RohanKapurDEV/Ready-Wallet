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

  TOS1: boolean = false;
  TOS2: boolean = false;
  TOS3: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHomeScreen() {
    this.router.navigateByUrl('/landing')
  }
}
