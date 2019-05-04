import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EtherWalletPage } from './ether-wallet.page';

import { MatRippleModule } from '@angular/material/core'

const routes: Routes = [
  {
    path: '',
    component: EtherWalletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatRippleModule
  ],
  declarations: [EtherWalletPage]
})
export class EtherWalletPageModule {}
