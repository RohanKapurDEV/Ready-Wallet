import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface GeneratedWallet {
  wallet_id: number,
  wallet_name: string,
  wallet_address: string,
  wallet_route: string,
  wallet_type: string,
  wallet_symbol: string,
  wallet_creation_timestamp?: number
}

const WALLETS_KEY: string = 'WALLETS_KEY';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

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

  // This function fetches all wallets stored, useful for fetching length of array for wallet id asssignment
  read(): Promise<GeneratedWallet[]> {
    return this.storage.get(WALLETS_KEY);
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
  delete(id: number) {
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
