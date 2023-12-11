import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlickrService } from '../services/flickr.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  photoId!: string;
  photo: any;

  constructor(private route: ActivatedRoute, private flickrservice: FlickrService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.photoId = params['id'];
      this.fetchPhotoDetails();
    });
  }

  fetchPhotoDetails() {
    this.flickrservice.getPhotoById(this.photoId).subscribe(
      (data) => {
        this.photo = data
      },
    );
  }

  openHighResPhoto(photo: any) {
    this.flickrservice.getPhotoById(photo.id).subscribe(data => {
      const highResUrl = this.flickrservice.getHighResPhotoUrl(data.photo);
      this.photo = highResUrl;
    });
  }

}
