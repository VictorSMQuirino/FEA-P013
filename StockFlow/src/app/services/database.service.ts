import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { map } from 'rxjs';

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

  getProducts() {
    return this.http.get<{ [key: string]: Product }>(`${this.API_URL}/products.json`,
      {
        params: new HttpParams().set('print', 'pretty')
      }
    )
    .pipe(
      map((responseData) => {
        const array: Product[] = [];
        for( const key in responseData) {
          if((responseData).hasOwnProperty(key)) {
            array.push({...(responseData as any)[key], id: key});
          }
        }
        return array;
      })
    )
  }
}
