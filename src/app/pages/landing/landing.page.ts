import { Component, OnInit } from '@angular/core';
import { NomicsService } from '../../services/nomics.service'
import * as $ from 'jquery';
var numeral = require('numeral');

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  btcPrice: string;
  ethPrice: string;
  
  btcChartLabels: any = [];
  ethChartLabels: any = [];

  btcChartDataset: any = [{ data: [], fill: false }];
  ethChartDataset: any = [{ data: [], fill: false }];

  lineChartType: string = 'line';
  lineChartLegend: boolean = false;

  lineChartColors: any = [
    {
      borderColor: '#F39415'
    }
  ]

  ethlineChartColors: any = [
    {
      borderColor: '#4B01E0'
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

  loadEthChart: boolean = false;
  loadBtcChart: boolean = false;

  constructor(private nomics: NomicsService) { }

  ngOnInit() {
    this.pullBTCChartFromNomics();
    this.pullBTCPriceFromNomics();
    this.pullETHPriceFromNomics();
    this.pullETHChartFromNomics();
  }

  pullBTCPriceFromNomics() {
    this.nomics.getPriceBySymbol('BTC').subscribe(
      (result) => {this.btcPrice = numeral(result[0].price).format('$ 0,0.00')}
    )
  }
  
  pullETHPriceFromNomics() {
    this.nomics.getPriceBySymbol('ETH').subscribe(
      (result) => {this.ethPrice = numeral(result[0].price).format('$ 0,0.00')}
    )
  }

  pullBTCChartFromNomics() {
    this.nomics.pullChartData('BTC').subscribe(
      (result) => {this.btcChartDataset[0].data = result[0].prices,
      this.btcChartLabels = result[0].timestamps,
      this.loadBtcChart = true}
    )
  }

  pullETHChartFromNomics() {
    this.nomics.pullChartData('ETH').subscribe(
      (result) => {this.ethChartDataset[0].data = result[0].prices,
      this.ethChartLabels = result[0].timestamps,
      this.loadEthChart = true}
    )
  }

}
