import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SatoshSettingsPage } from './satosh-settings.page';

const routes: Routes = [
  {
    path: '',
    component: SatoshSettingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SatoshSettingsPage]
})
export class SatoshSettingsPageModule {}
