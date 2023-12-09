import { Component } from '@angular/core';
import { FlickrService } from './services/flickr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flickrfeed';
  images: any;
  tags: string = '';

  constructor(private flickrservice: FlickrService) { }
  searchPhotos() {
    this.flickrservice.searchPhotos(this.tags).subscribe((data) => {
      this.images = data;
    });
  }
}
