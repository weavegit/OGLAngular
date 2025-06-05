import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParamsOptions } from '@angular/common/http'
import { ProductDTO } from '../dto/product.dto'
import { catchError, retry, throwError } from 'rxjs'
import { Constants } from '../constants'

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  readProducts() {

    let url = Constants.BASE_URL + '/product'

    return this.http.get<ProductDTO[]>(url, { withCredentials: false }).pipe(
      catchError(this.handleError)
    )
  }
  readProduct(id: number) {

    let url = Constants.BASE_URL + '/product/' + id

    return this.http.get<ProductDTO>(url, { withCredentials: false }).pipe(
      catchError(this.handleError)
    )
  }
  saveProduct(ProductDTO: ProductDTO) {
   let headers = new Headers();
    headers.append('Content-Type', 'application/json');



    let url = Constants.BASE_URL + '/product'
    let payload = JSON.stringify(ProductDTO)
    console.log(payload)
    //  {"id":ProductDTO.id,"sku":ProductDTO.sku,"description":ProductDTO.description,"price":ProductDTO.price}
    return this.http.post<string>(url,JSON.parse(payload)).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
  constructor(

    private http: HttpClient
  ) { }
}
