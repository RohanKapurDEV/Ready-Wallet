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

  btcPrice: any;
  ethPrice: string;

  constructor(private nomics: NomicsService) { }

  ngOnInit() {
    this.pullBTCPriceFromNomics()
    this.pullETHPriceFromNomics()
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

}
