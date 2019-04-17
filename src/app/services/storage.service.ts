import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Web3Service } from '../services/web3.service';
import { NomicsService } from '../services/nomics.service'
var numeral = require('numeral');

export interface GeneratedWallet {
  wallet_id: string,
  wallet_name: string,
  wallet_address: string,
  wallet_route: string,
  wallet_type: string,
  wallet_symbol: string,
  wallet_creation_timestamp?: number,
  wallet_balanceInNativeDenomination?: string
  wallet_balanceInFiat?: string
}

const WALLETS_KEY: string = 'WALLETS_KEY';
const CURRENT_WALLET_ADDRESS: string = '';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private web3: Web3Service, private nomics: NomicsService) { }

  // This function creates an array for the wallet store if no array exists, or adds wallet to existing array
  create(wallet: GeneratedWallet): Promise<any> {
    return this.storage.get(WALLETS_KEY).then((expectedArray: GeneratedWallet[]) => {
      if (expectedArray) {
        expectedArray.push(wallet);
        return this.storage.set(WALLETS_KEY, expectedArray);
      } else {
        return this.storage.set(WALLETS_KEY, [wallet]);
      }
    })
  }

  // This function fetches all wallets stored
  read(): Promise<any> {
    return this.storage.get(WALLETS_KEY);
  }

  readWithBalances(): Promise<any> {
    return this.storage.get(WALLETS_KEY).then(async (expectedArray: GeneratedWallet[]) => {
      if (!expectedArray || expectedArray.length === 0) {
        return null;
      }

      let updatedArray: GeneratedWallet[] = [];
      let mockPrice = '10000';
      let ethPrice: string;
      let btcPrice: string;

      let ethPriceCall = await this.nomics.getPriceBySymbol('ETH').subscribe((result: any) => { ethPrice = result[0].price; })
      let btcPriceCall = await this.nomics.getPriceBySymbol('BTC').subscribe((result: any) => { btcPrice = result[0].price; })

      for (let x of expectedArray) {
        if (x.wallet_type === 'Ethereum') {
          let balance = await this.web3.checkEtherBalance(x.wallet_address); // Cache another var to convert from wei to eth 
          let balanceInEtherDisplay = 'Ξ ' + this.web3.weiToEther(balance);
          let balanceInEther = this.web3.weiToEther(balance);
          let balanceInUsd = numeral(parseFloat(balanceInEther) * parseFloat(ethPrice)).format('$ 0,0.00')
          x.wallet_balanceInNativeDenomination = balanceInEtherDisplay;
          x.wallet_balanceInFiat = balanceInUsd;
          console.log('USD Balance is ' + balanceInUsd);
          updatedArray.push(x);
        } else if (x.wallet_type === 'Bitcoin') {
          x.wallet_balanceInFiat = numeral(mockPrice).format(`$ 0,0.00`);
          x.wallet_balanceInNativeDenomination = '₿ 2.7';
          updatedArray.push(x)
        }
      }

      return updatedArray;
    })
  }

  // This function updates properties of existing wallets in the store
  update(wallet: GeneratedWallet): Promise<any> {
    return this.storage.get(WALLETS_KEY).then((expectedArray: GeneratedWallet[]) => {
      if (!expectedArray || expectedArray.length === 0) {
        return null;
      }

      let updatedArray: GeneratedWallet[] = [];

      for(let x of expectedArray) {
        if (x.wallet_id === wallet.wallet_id) {
          updatedArray.push(wallet);
        } else {
          updatedArray.push(x);
        }
      }

      return this.storage.set(WALLETS_KEY, updatedArray);
    })
  }

  // This function deletes existing wallets from the wallet array
  delete(id: string) {
    return this.storage.get(WALLETS_KEY).then((expectedArray: GeneratedWallet[]) => {
      if (!expectedArray || expectedArray.length === 0) {
        return null;
      }

      let updatedArray: GeneratedWallet[] = [];

      for (let x of expectedArray) {
        if (x.wallet_id !== id) {
          updatedArray.push(x);
        }
      }

      return this.storage.set(WALLETS_KEY, updatedArray);
    })
  }

  // This function sets the globally available wallet address for in-wallet address resolution on all wallet pages
  setCurrentAddress(address: string) {
    return this.storage.set(CURRENT_WALLET_ADDRESS, address)
  }
}
