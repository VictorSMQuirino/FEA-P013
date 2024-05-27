import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private readonly API_URL: string = 'https://fea-p013-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient) { }
  
  postProduct(product: Product) {
    this.http.post(`${this.API_URL}/products.json`, product).subscribe(response => {
      console.log(response);
    });
  }
}
