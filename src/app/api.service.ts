import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class ApiService {

  constructor(public http: HttpClient) {
  }

   // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  get( url: string , endpoint: string, params?: any, options?: {
			      headers?: HttpHeaders;
			      observe: 'response';
			      reportProgress?: boolean;
			      responseType?: 'json';
			      withCredentials?: boolean;
			}) : Observable<Object> {       

		let p = ""
		// Support easy query params for GET requests
		if (params) {
			p = "?"
		  for(let k in params) {
		    p += k+"="+params[k]
		  }
		}

		return this.http.get(url + '/' + endpoint + p, options);
  }

  post(url: string , endpoint: string, body: any, options?: {}) {
    return this.http.post(url + '/' + endpoint, body,options);
  }

  put(url: string , endpoint: string, body: any) {
    return this.http.put(url + '/' + endpoint, body);
  }

  delete(url: string , endpoint: string, body: any) {
    return this.http.post(url + '/' + endpoint, body);
  }

  patch(url: string , endpoint: string, body: any) {
    return this.http.put(url + '/' + endpoint, body);
  }

}
