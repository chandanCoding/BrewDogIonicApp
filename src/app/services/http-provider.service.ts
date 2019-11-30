export const API_BASE_URL = "https://api.punkapi.com/v2/beers";

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class HttpProviderService {
  constructor(private _http: HttpClient) {}

  public HttpGet(route: string): any {
    let url = API_BASE_URL + route;
    return this._http.get(url).pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Code: ${error.statusCode}\nError: ${error.error}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
