import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private apiUrl = '.netlify/functions/addImages'; // Update with your serverless function URL

  constructor(private http: HttpClient) {}

  uploadImage(imageData: any): Observable<any> {
    return this.http.post(this.apiUrl, imageData);
  }
}
