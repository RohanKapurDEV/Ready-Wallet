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
}
