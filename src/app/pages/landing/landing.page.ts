import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NomicsService } from '../../services/nomics.service';
import { StorageService } from '../../services/storage.service';
import { Web3Service } from '../../services/web3.service';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';
var numeral = require('numeral');

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  androidDevice: boolean = false;
  
  wallets: any = [];

  btcPrice: string;
  ethPrice: string;

  btcPriceLoad: boolean = false;
  ethPriceLoad: boolean = false;
  
  btcChartLabels: any = [];
  ethChartLabels: any = [];
  
  btcChartDataset: any = [{ data: [0, 0, 0, 0, 0, 0, 0], fill: false }];
  ethChartDataset: any = [{ data: [0, 0, 0, 0, 0, 0, 0], fill: false }];

  lineChartType: string = 'line';
  lineChartLegend: boolean = false;

  btclineChartColors: any = [
    {
      borderColor: '#F39415',
      backgroundColor: 'rgba(243, 148, 21, 0.3)'
    }
  ]

  ethlineChartColors: any = [
    {
      borderColor: '#4B01E0',
      backgroundColor: 'rgba(81, 7, 228, 0.3)'
    }
  ]

  btcChartsOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false
    },
    elements: {
      line: {
        borderWidth: 4
      },
      point: {
        radius: 0
      }
    },
    tooltips: {
      enabled: true
    },
    scales: {
      yAxes: [
        {
          display: false
        }
      ],
      xAxes: [
        {
          display: false
        }
      ]
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuint'
    }
  }

  sliderOptions = {
    spaceBetween: 40,
    slidesPerView: 'auto',
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 30
  }

  constructor(private nomics: NomicsService, private storage: StorageService, private web3: Web3Service, private actionSheet: ActionSheet,
    private router: Router) { }

  ngOnInit() {
    this.pullBTCChartFromNomics();
    this.pullBTCPriceFromNomics();
    this.pullETHPriceFromNomics();
    this.pullETHChartFromNomics();
    this.setWallets();
    this.detectAndroid();
  }

  detectAndroid() {
    let ua = navigator.userAgent.toLowerCase()

    let android = ua.indexOf('android') > -1;
    if (android) {
      this.androidDevice = true;
    }
  }

  async showActionSheet() {
    try
      {  let actionSheetLabels = ['Create a new wallet', 'Import a wallet', 'Terms of Service', 'About Ready Wallet'];

        const options: ActionSheetOptions = {
          title: 'Ready Wallet Options',
          buttonLabels: actionSheetLabels,
          addCancelButtonWithLabel: 'Cancel',
          androidTheme: 5
        }

        const selectedIndex = await this.actionSheet.show(options);
        console.log('Selected' + selectedIndex)

        switch(selectedIndex) {
          case 1:
            this.router.navigateByUrl('/add-wallet');
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;
        } 
      }

      catch(error) {
        console.log(error)
      }  
  }

  setWallets() {
    this.storage.read().then((expectedArray) => {
      if (expectedArray === null) {
        console.log('No wallets exist')
      } else {
        this.wallets = expectedArray;
      };
    })
  }

  addWallet() { // This function is only for testing, should be re-imported to add-wallet component ts file when necessary
    let wallet = this.web3.createWallet("Rohan's ETH Wallet");
    this.storage.create(wallet);
    this.setWallets()
  }
  
  addWallet2() { // This function is only for testing, should be re-imported to add-wallet component ts file when necessary
    let wallet = this.web3.createWallet2("Rohan's BTC Wallet");
    this.storage.create(wallet);
    this.setWallets()
  }

  pullBTCPriceFromNomics() {
    this.nomics.getPriceBySymbol('BTC').subscribe(
      (result) => {this.btcPrice = numeral(result[0].price).format('$ 0,0.00'),
      this.btcPriceLoad = true;}
    )
  }
  
  pullETHPriceFromNomics() {
    this.nomics.getPriceBySymbol('ETH').subscribe(
      (result) => {this.ethPrice = numeral(result[0].price).format('$ 0,0.00'),
      this.ethPriceLoad = true;}
    )
  }

  pullBTCChartFromNomics() {
    this.nomics.pullChartData('BTC').subscribe(
      (result) => {this.btcChartDataset[0].data = result[0].prices,
      this.btcChartLabels = result[0].timestamps}
    )
  }

  pullETHChartFromNomics() {
    this.nomics.pullChartData('ETH').subscribe(
      (result) => {this.ethChartDataset[0].data = result[0].prices,
      this.ethChartLabels = result[0].timestamps}
    )
  }

}
