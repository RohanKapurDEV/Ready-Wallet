import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EthereumPage } from './ethereum.page';

const routes: Routes = [
  {
    path: '',
    component: EthereumPage,
    children: [
      {
        path: 'etherWallet',
        children: [
          {
            path: '',
            loadChildren: './ether-wallet/ether-wallet.module#EtherWalletPageModule'
          },
          {
            path: 'receive',
            loadChildren: './receive-ether/receive-ether.module#ReceiveEtherPageModule'
          },
          {
            path: 'send',
            loadChildren: './send-ether/send-ether.module#SendEtherPageModule'
          }
        ]
      },
      {
        path: 'etherTrade',
        children: [
          {
            path: '',
            loadChildren: './ether-trade/ether-trade.module#EtherTradePageModule'
          }
        ]
      },
      {
        path: 'etherBuy',
        children: [
          {
            path: '',
            loadChildren: './ether-buy/ether-buy.module#EtherBuyPageModule'
          }
        ]
      },
      {
        path: 'etherOptions',
        children: [
          {
            path: '',
            loadChildren: './ether-settings/ether-settings.module#EtherSettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/ethereum/etherWallet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/ethereum/etherWallet',
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
  declarations: [EthereumPage]
})
export class EthereumPageModule {}
