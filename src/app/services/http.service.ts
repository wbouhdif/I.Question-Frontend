import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiPath: string = 'http://localhost:8080/api/';
  private requestOptions: Object = {
    observe: 'response',
    responseType: 'json',
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  get(destination: string) {
    return this.http.get<any>(this.apiPath + destination, this.requestOptions)
  }

  post(destination: string, body: any) {
    body = (JSON.stringify(body)).replaceAll("_", "");

    return this.http.post<any>(this.apiPath + destination, body, this.requestOptions);
  }

  delete(destination: string) {
    return this.http.delete(this.apiPath + destination, this.requestOptions)
  }

  put(destination: string, body: any) {
    let jsonBody = JSON.parse(JSON.stringify(body));
    return this.http.put(this.apiPath + destination, jsonBody)
  }
}
