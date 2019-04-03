import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.page.html',
  styleUrls: ['./add-wallet.page.scss'],
})
export class AddWalletPage implements OnInit {

  public walletName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHomeScreen() {
    this.router.navigateByUrl('/landing')
  }

}
