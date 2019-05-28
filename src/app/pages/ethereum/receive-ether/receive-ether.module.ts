import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ReceiveEtherPage } from './receive-ether.page';

const routes: Routes = [
  {
    path: '',
    component: ReceiveEtherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule
  ],
  declarations: [ReceiveEtherPage]
})
export class ReceiveEtherPageModule {}
