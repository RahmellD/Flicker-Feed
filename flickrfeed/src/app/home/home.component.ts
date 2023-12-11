import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { FlickrService } from '../services/flickr.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	private searchInput$ = new Subject<string>();
	photos: any[] = [];
	searchText = '';
	currPage = 1;
	photosPerPage = 20;

	throttle = 300;
	scrollDistance = 1;

	constructor(private flickrService: FlickrService, private router: Router) { }

	ngOnInit() {
		this.searchInput$
			.pipe(
				debounceTime(500),
				switchMap(searchText => this.flickrService.searchPhotos(searchText, (this.currPage = 1))),
				takeUntil(this.destroy$)
			)
			.subscribe(data => {
				this.photos = data.photos.photo;
			});
	}

	onSearchInput(event: any) {
		// This function will be called every time the input value changes
		const searchText = event.target.value;
		this.searchText = searchText;

		// Push the searchText to the Subject to trigger the service call after debounceTime
		this.searchInput$.next(searchText);
	}

	onScrollDown() {
		this.currPage++;
		this.flickrService.searchPhotos(this.searchText, this.currPage).subscribe(res => {
			this.photos = this.photos.concat(res.photos.photo);
		});
	}

	ngOnDestroy() {
		// Ensure that subscriptions are cleaned up when the component is destroyed
		this.destroy$.next();
		this.destroy$.complete();
	}

	openPhotoDetail(photoId: any) {
		console.log(photoId);
		this.router.navigate(['/photo-details', photoId.id]);
	}
}
