import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SatoshiBuyPage } from './satoshi-buy.page';

const routes: Routes = [
  {
    path: '',
    component: SatoshiBuyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SatoshiBuyPage]
})
export class SatoshiBuyPageModule {}
