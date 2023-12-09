import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {

  constructor(private http: HttpClient) { }

  searchPhotos(tags: string) {
    const apiUrl = `https://www.flickr.com/services/feeds/photos_public.gne?tags=${tags}&format=json&nojsoncallback=1`;
    return this.http.get(apiUrl);
  }
}
