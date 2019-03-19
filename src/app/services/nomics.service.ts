import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class NomicsService {

  apiUrl: string = 'https://api.nomics.com/v1';
  apiKey: string = '0e9a6df5db1b0d1f8c5d5d6c182019ae';

  constructor(private http: HttpClient) { }

  getPriceBySymbol(sym: string) {
    // Sym input has to be of the following format - BTC, ETH, LTC, ZEC, etc ... 
    return this.http.get(`${this.apiUrl}/prices?key=${this.apiKey}`).pipe(
      tap(console.log),
      map(array => array.filter(obj => obj.currency === sym))
    )
  }

  pullChartData(sym: string) {
    // encodeURIComponent((new Date()).toISOString()) -- RFC3339 Format timestamp (URI Escaped) - Required for API Call
    // ---------------------------------------------------
    // var yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000))
    // encodeURIComponent((yesterday).toISOString()) -- Correct format for 'start' param in API call

    let yesterdayISO8061 = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    let yesterdayRFC3339 = encodeURIComponent((yesterdayISO8061).toISOString()); // This line here takes the necessary data (iso8061) turns it into (rfc3339) and then, encodes that string so its compatible with the API call.

    return this.http.get(`${this.apiUrl}/currencies/sparkline?key=${this.apiKey}&start=${yesterdayRFC3339}`).pipe(
      tap(console.log), 
      map(array => array.filter(obj => obj.currency === sym))
    )
  }
}
