import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { CustomerDTO } from '../dto/customer.dto'
import { catchError, retry, throwError } from 'rxjs'
import { Constants } from '../constants'
import { CityDTO } from '../dto/cities.dto';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  //
  //  Will get all customers
  //
  readCustomers() {

    let url = Constants.BASE_URL + '/customer'

    return this.http.get<CustomerDTO[]>(url, { withCredentials: false }).pipe(
      catchError(this.handleError)
    )
  }

  //
  //  NEW ENDPOINT to call the grouping of the cities.
  //
  groupCities() {

    let url = Constants.BASE_URL + '/customer/group'

    return this.http.get<CityDTO[]>(url, { withCredentials: false }).pipe(
      catchError(this.handleError)
    )
  }
  //
  //  Will get a specific customer - I'm not currently using this.
  //
  readCustomer(id: number) {

    let url = Constants.BASE_URL + '/customer/' + id

    return this.http.get<CustomerDTO[]>(url, { withCredentials: false }).pipe(
      catchError(this.handleError)
    )
  }
  //
  //  Save New or edited customer
  //
  saveCustomer(customerDTO: CustomerDTO) {

    let url = Constants.BASE_URL + '/customer'
    let payload = JSON.stringify(customerDTO)
    console.log(payload)
    return this.http.post(url, JSON.parse(payload)).pipe(
      catchError(this.handleError)
    )
  }
  //
  //  Exeption handlers
  //
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
