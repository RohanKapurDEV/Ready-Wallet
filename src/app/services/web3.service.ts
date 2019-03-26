import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { StorageService, GeneratedWallet } from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  constructor(private storageRef: StorageService) { }

  createWallet(wallet_name: string) {
    let web3 = new Web3("https://mainnet.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");
    let wallet: GeneratedWallet = <GeneratedWallet>{}
    let genWallet = web3.eth.accounts.create()
    wallet.wallet_name = wallet_name;
    wallet.wallet_id = genWallet.address;
    wallet.wallet_address = genWallet.address;
    wallet.wallet_route = 'ethereum';
    wallet.wallet_type = 'Bitcoin'
    wallet.wallet_symbol = 'ETH';
    wallet.wallet_creation_timestamp = new Date().getTime() // Saved in UNIX Epoch format
    return wallet
  }
}
