import { Injectable } from '@angular/core';
import { GeneratedWallet } from './storage.service';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export interface Token {
  tokenName?: string,
  tokenSymbol?: string,  
  tokenPrice?: string, // Display price using numeralJS formatted as string
  tokenBalance?: string, // Token balance after accounting for contract decimal
  contractAddress?: string
}

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  tokensArray: string[] = [
    "0x4e470dc7321e84ca96fcaedd0c8abcebbaeb68c6",
    "0x4bfba4a8f28755cb2061c413459ee562c6b9c51b",
    "0xbf5d8683b9be6c43fca607eb2a6f2626a18837a6",
    "0x9fcc27c7320703c43368cf1a4bf076402cd0d6b4",
    "0xa577731515303f0c0d00e236041855a5c4f114dc",
    "0x72fd6c7c1397040a66f33c2ecc83a0f71ee46d5c",
    "0xdb0040451f373949a4be60dcd7b6b8d6e42658b6",
    "0xb43d10bbe7222519da899b72bf2c7f094b6f79d7",
    "0xe55c607d58c53b2b06a8e38f67f4c0fcaeed2c31"
  ]

  constructor() { }

  createWallet(wallet_name: string) {
    let web3 = new Web3("https://ropsten.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");
    let wallet: GeneratedWallet = <GeneratedWallet>{}
    let genWallet = web3.eth.accounts.create()
    wallet.wallet_name = wallet_name;
    wallet.wallet_id = genWallet.address;
    wallet.wallet_address = genWallet.address;
    wallet.wallet_route = 'ethereum';
    wallet.wallet_type = 'Ethereum';
    wallet.wallet_symbol = 'ETH';
    wallet.wallet_creation_timestamp = new Date().getTime() // Saved in UNIX Epoch format
    return wallet
  }
  
  createWallet2(wallet_name: string) { // Remove once BTC wallet gen support is added, this is for testing purposes only. Actually loads ETH Wallets
    let web3 = new Web3("https://ropsten.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");
    let wallet: GeneratedWallet = <GeneratedWallet>{}
    let genWallet = web3.eth.accounts.create()
    wallet.wallet_name = wallet_name;
    wallet.wallet_id = genWallet.address;
    wallet.wallet_address = genWallet.address;
    wallet.wallet_route = 'bitcoin';
    wallet.wallet_type = 'Bitcoin';
    wallet.wallet_symbol = 'ETH';
    wallet.wallet_creation_timestamp = new Date().getTime() // Saved in UNIX Epoch format
    return wallet
  }

  async checkEtherBalance(wallet_address: string) {
    let web3 = new Web3("https://ropsten.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");
    let balance = await web3.eth.getBalance(wallet_address);
    console.log(balance + ' in wei');
    return balance
  }

  weiToEther(amountInWei: any) {
    let web3 = new Web3("https://ropsten.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");
    let balanceInEther = web3.utils.fromWei(amountInWei, 'ether');;
    return balanceInEther;
  }

  async checkErc20Balances(currentAddress: string) {
    let web3 = new Web3("https://ropsten.infura.io/v3/fcea8205fda14a14bcb9a2dbb27cc46f");

    let deltaContractAddress: string = '0x2Cf5934204AC2Ec71378e3C72E472bC9871baeE0' // Currently ropsten address
    let deltaContractABI: AbiItem[] = [{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"depositedBalances","outputs":[{"name":"balances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"tokenBalances","outputs":[{"name":"balances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"selector","type":"bytes4"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"},{"name":"userFirst","type":"bool"}],"name":"depositedBalancesGeneric","outputs":[{"name":"balances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"functionSignature","type":"string"}],"name":"getFunctionSelector","outputs":[{"name":"","type":"bytes4"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"spenderContract","type":"address"},{"name":"user","type":"address"},{"name":"tokens","type":"address[]"}],"name":"tokenAllowances","outputs":[{"name":"allowances","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"exchange","type":"address"},{"name":"selector","type":"bytes4"},{"name":"user","type":"address"}],"name":"depositedEtherGeneric","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

    let deltaContractInstance = new web3.eth.Contract(deltaContractABI, deltaContractAddress)
    // console.log(deltaContractInstance)

    // let ans = await deltaContractInstance.methods.admin().call();
    // console.log(ans + ' is the contract admin')

    let balances = await deltaContractInstance.methods.tokenBalances(currentAddress, this.tokensArray).call();
    // console.log(balances.map(x => x.toString()))
    let balanceArray = balances.map(x => x.toString())
    console.log(balanceArray);
    
  }
}
