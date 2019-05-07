import { Injectable } from '@angular/core';
import { GeneratedWallet } from './storage.service';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { NomicsService } from './nomics.service';
import { Subscription } from 'rxjs';
import { tokenName } from '@angular/compiler';
var numeral = require('numeral');

export interface Token {
  tokenSymbol?: string,  
  tokenPrice?: any, // Display price using numeralJS formatted as string
  tokenPriceDisplay?: string,
  tokenBalance?: number, // Token balance after accounting for contract decimal
  tokenBalanceInWei?: string,
  totalBalanceDisplay?: string,
  contractAddress?: string,
  contractDecimal?: string,
  tokenLogo?: string, // Token logo is the location of assets/icon folder relative to the component consuming the erc20 function of this service. 
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

  constructor(private nomics: NomicsService) { }

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
    let erc20ContractABI: AbiItem[] = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_burner","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];

    let deltaContractInstance = new web3.eth.Contract(deltaContractABI, deltaContractAddress)

    let balances = await deltaContractInstance.methods.tokenBalances(currentAddress, this.tokensArray).call();
    let balanceArray = balances.map(x => x.toString())

    let firstArray = []

    balanceArray.forEach((balance, index) => {
      if (balance != 0) {
        let balanceObj: Token = <Token>{};
        balanceObj.tokenBalanceInWei = balance;
        balanceObj.contractAddress = this.tokensArray[index];
        firstArray.push(balanceObj);
      }
    });
    
    firstArray.forEach(async (tokenObj: Token) => {
      let tokenContractInstance = new web3.eth.Contract(erc20ContractABI, tokenObj.contractAddress);
      let contractDecimals = await tokenContractInstance.methods.decimals().call(); //returns BigNumber, use toString() when accounting for token decimal
      let contractSymbol = await tokenContractInstance.methods.symbol().call();

      tokenObj.contractDecimal = contractDecimals;
      tokenObj.tokenSymbol = contractSymbol;

      let contractDecimalParse = parseInt(tokenObj.contractDecimal.toString());
      let tokenBalanceFloat = parseInt(tokenObj.tokenBalanceInWei) / ( Math.pow(10, contractDecimalParse));
      let tokenBalanceReal = numeral(tokenBalanceFloat).format('0,0.00');
      tokenObj.tokenBalance = tokenBalanceReal;
      
      let tokenPrice = await this.nomics.getPriceBySymbol(tokenObj.tokenSymbol).subscribe((result) => { tokenObj.tokenPrice = result[0].price, tokenObj.tokenPriceDisplay = numeral(result[0].price).format('$ 0,0.00'), tokenObj.totalBalanceDisplay = numeral(tokenObj.tokenBalance * tokenObj.tokenPrice).format('$ 0,0.00') });
      
      tokenObj.tokenLogo = '../../../../assets/icon/' + tokenObj.tokenSymbol + '.svg'
    });

    return firstArray
  }
}
