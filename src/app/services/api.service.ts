import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = "https://taskmanagerserverapp.vercel.app/api/v1";

  constructor(private http: HttpClient) { }

  getData(tailUrl : string, options : object | null = null ) : Observable<any> {

    if(!options) {
      return this.http.get(this.baseUrl + tailUrl);
    }
    return this.http.get<any>(this.baseUrl + tailUrl, options);

  }

  postData(tailUrl: string, payload: any) : Observable<any> {
    return this.http.post<any>(this.baseUrl + tailUrl, payload);
  }

  deleteData(tailUrl: string) : Observable<any> {
    return this.http.delete<any>(this.baseUrl + tailUrl);
  }

  updateData(tailUrl: string, payload: any) : Observable<any> {
    return this.http.put<any>(this.baseUrl + tailUrl, payload);
  }
}
