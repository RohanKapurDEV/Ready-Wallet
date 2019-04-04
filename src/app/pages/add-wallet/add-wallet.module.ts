import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddWalletPage } from './add-wallet.page';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio'

const routes: Routes = [
  {
    path: '',
    component: AddWalletPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatRadioModule
  ],
  declarations: [AddWalletPage]
})
export class AddWalletPageModule {}
