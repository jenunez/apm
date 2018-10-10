import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

import { IProduct } from "./products";

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private productUrl = 'api/products/product.json';
  constructor (private http: HttpClient) {};

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real worls app, we may send the server to some remote logging infrastrucure
    //instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network occuerred. Handle it accordingly.
      errorMessage = `An erro ocurred: ${err.error.message}`;
    } else {
      //The backend returned an unsuccessful respose code.
      //Teh response body may contain clues as to what went wrong.
      errorMessage = `Server returned code: ${err.status}, erro message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

