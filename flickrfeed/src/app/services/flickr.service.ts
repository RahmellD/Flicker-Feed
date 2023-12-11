import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface FlickrApiResponse {
	photos: {
		page: number;
		total: number;
		photo: any[];
	};
}

@Injectable({
	providedIn: 'root'
})
export class FlickrService {
	searchText: string = '';
	constructor(private http: HttpClient) { }

	searchPhotos(tags: string, currPage: number): Observable<FlickrApiResponse> {
		const api_key = 'cd1d3b7baeecf7e397a88979f043a918';
		const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&';
		const params = `api_key=${api_key}&text=${tags}&format=json&nojsoncallback=1&per_page=20&page=${currPage}`;

		return this.http.get<FlickrApiResponse>(`${url}${params}`);
	}

	getPhotoById(photoId: string) {
		const api_key = 'cd1d3b7baeecf7e397a88979f043a918';
		const url = 'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo';
		const params = `api_key=${api_key}&photo_id=${photoId}&format=json&nojsoncallback=1`;

		return this.http.get<any>(`${url}&${params}`);
	}

	getHighResPhotoUrl(photo: any) {
		return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
	}
}
