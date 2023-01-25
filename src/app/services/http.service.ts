import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { jsonIgnoreReplacer} from "json-ignore";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiPath: string = environment.apiUrl;

  constructor(private http: HttpClient, private userService: UserService) { }

  get(destination: string) {
    return this.http.get<any>(this.apiPath + destination, this.getRequestOptions())
  }

  post(destination: string, body: any) {
    body = (JSON.stringify(body, jsonIgnoreReplacer));

    return this.http.post<any>(this.apiPath + destination, body, this.getRequestOptions());
  }

  delete(destination: string) {
    return this.http.delete(this.apiPath + destination, this.getRequestOptions())
  }

  put(destination: string, body: any) {
    body = (JSON.stringify(body, jsonIgnoreReplacer));

    return this.http.put(this.apiPath + destination, body, this.getRequestOptions())
  }

  private getRequestOptions() {

    let headers = new HttpHeaders({'Content-Type': 'application/json'});

    if (this.userService.getJwtToken() != undefined) {
      headers = headers.append('Authorization', "Bearer " + this.userService.getJwtToken().replace("\"", ""))
    }

    let requestOptions: Object = {
      observe: 'response',
      responseType: 'json',
      headers: headers
    };
    return requestOptions;
  }
}
