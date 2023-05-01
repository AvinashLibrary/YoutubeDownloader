import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Listitem,pagination} from '../src/videolist/listitem'

@Injectable({
  providedIn: 'root'
})
export class DataDownloaderService {

  constructor(private http: HttpClient) { }


  getYoutubeData(downUrl:any):Observable<any> {
    var myUri = encodeURIComponent(downUrl)
    return this.http.get(`http://localhost:3000/download?downUri=${myUri}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      
      }),observe:'response'
    })
  }

  getpostList(serviceAttr:pagination): Observable<any> {
    // const httpParams = {
    //   params: new HttpParams({
         
    //   })
    
    // };
    return this.http.get(`http://localhost:3000/listUserUplaodItems?$skip=${serviceAttr.$skip}&$top=${serviceAttr.$top}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      
      }),observe:'response'
    })
  }

  downloadContent(url:any): Observable<any>{
    url  = encodeURIComponent(url)
    return this.http.get(`http://localhost:3000/downloadVideoFile?downUri=${url}`, {
      "responseType": "blob" 
    // headers: new HttpHeaders({
    //   'Content-Type': 'application/octet-stream',
    //   'Accept': 'application/octet-stream'
    // }),observe:'response'
  })
}
}
