import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'add-wallet', loadChildren: './pages/add-wallet/add-wallet.module#AddWalletPageModule' },
  { path: 'about-us', loadChildren: './pages/about-us/about-us.module#AboutUsPageModule' },
  { path: 'bitcoin', loadChildren: './pages/bitcoin/bitcoin.module#BitcoinPageModule' },
  { path: 'ethereum', loadChildren: './pages/ethereum/ethereum.module#EthereumPageModule' },
  { path: 'receive-ether', loadChildren: './pages/ethereum/receive-ether/receive-ether.module#ReceiveEtherPageModule' },
  { path: 'send-ether', loadChildren: './pages/ethereum/send-ether/send-ether.module#SendEtherPageModule' },
];

/**
 * Saved for lazyLoad route memorization
 * 
 * 
  { path: 'ether-wallet', loadChildren: './pages/ethereum/ether-wallet/ether-wallet.module#EtherWalletPageModule' },
  { path: 'ether-trade', loadChildren: './pages/ethereum/ether-trade/ether-trade.module#EtherTradePageModule' },
  { path: 'ether-settings', loadChildren: './pages/ethereum/ether-settings/ether-settings.module#EtherSettingsPageModule' },
  { path: 'ether-buy', loadChildren: './pages/ethereum/ether-buy/ether-buy.module#EtherBuyPageModule' },
  { path: 'satoshi-wallet', loadChildren: './pages/bitcoin/satoshi-wallet/satoshi-wallet.module#SatoshiWalletPageModule' },
  { path: 'satoshi-buy', loadChildren: './pages/bitcoin/satoshi-buy/satoshi-buy.module#SatoshiBuyPageModule' },
  { path: 'satosh-settings', loadChildren: './pages/bitcoin/satosh-settings/satosh-settings.module#SatoshSettingsPageModule' },
 */

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
