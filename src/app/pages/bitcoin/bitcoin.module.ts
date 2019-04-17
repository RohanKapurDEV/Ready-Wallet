import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BitcoinPage } from './bitcoin.page';

const routes: Routes = [
  {
    path: '',
    component: BitcoinPage,
    children: [
      {
        path: 'satoshiWallet',
        children: [
          {
            path: '',
            loadChildren: './satoshi-wallet/satoshi-wallet.module#SatoshiWalletPageModule'
          }
        ]
      },
      {
        path: 'satoshiBuy',
        children: [
          {
            path: '',
            loadChildren: './satoshi-buy/satoshi-buy.module#SatoshiBuyPageModule'
          }
        ]
      },
      {
        path: 'satoshiOptions',
        children: [
          {
            path: '',
            loadChildren: './satosh-settings/satosh-settings.module#SatoshSettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/bitcoin/satoshiWallet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/bitcoin/satoshiWallet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BitcoinPage]
})
export class BitcoinPageModule {}
