import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BackendApiService {

  constructor(private http: HttpClient) { }

  sendDataToBackend(formData:any){
    let response:any;
    this.http.post<any>(`${environment.serverUrl}/processData`,formData).subscribe((data: any) => {
      response = data;
    });

    return response;
  }
}
