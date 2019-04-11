import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Web3Service } from '../services/web3.service';

export interface GeneratedWallet {
  wallet_id: string,
  wallet_name: string,
  wallet_address: string,
  wallet_route: string,
  wallet_type: string,
  wallet_symbol: string,
  wallet_creation_timestamp?: number,
  wallet_balance?: string
}

const WALLETS_KEY: string = 'WALLETS_KEY';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private web3: Web3Service) { }

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

      for (let x of expectedArray) {
        if (x.wallet_type === 'Ethereum') {
          const balance = await this.web3.checkEtherBalance(x.wallet_address);
          x.wallet_balance = balance;
          console.log(x.wallet_address)
          updatedArray.push(x);
        } else if (x.wallet_type === 'Bitcoin') {
          x.wallet_balance = '$0.00'
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
}
