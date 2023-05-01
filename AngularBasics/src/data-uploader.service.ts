import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataUploaderService {

  constructor(private http: HttpClient) {

  };


  uploadFilesToNode(content:File): Observable<any> {
    const formData: FormData  =  new FormData()
    formData.append('file',content)

    return this.http.post('http://localhost:3000/uploadfileToNodeMutler',formData,  {
      headers: new HttpHeaders({
        reportProgress:'true',
        responseType:'json'
      }), 
    })
  };

  getConfig(): Observable<any> {
    // const httpOptions = {
    //   observe:'response',
    //   headers: new HttpHeaders({
    //      'Content-Type':  'application/json'      
    //   })

    // };
    return this.http.get('http://localhost:3000/getListOfStoredItems', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }), observe: 'response'
    })
  }


}
