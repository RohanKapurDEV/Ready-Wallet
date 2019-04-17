import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SatoshiWalletPage } from './satoshi-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: SatoshiWalletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SatoshiWalletPage]
})
export class SatoshiWalletPageModule {}
