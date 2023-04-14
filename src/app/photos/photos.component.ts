import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from './photos.service';
import { BehaviorSubject, exhaustMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavouritePhotosService } from '../shared/state/favourite-photos/favourite-photos.service';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [PhotosService],
})
export class PhotosComponent implements OnDestroy {
  protected loadImages$ = new BehaviorSubject<void>(undefined);

  protected images$ = this.loadImages$.pipe(
    exhaustMap(() => this.photosService.getPhotos())
  );

  constructor(
    private photosService: PhotosService,
    private favouritePhotosService: FavouritePhotosService
  ) {}

  ngOnDestroy() {
    this.loadImages$.complete();
  }

  addToFavourites(imgUrl: string) {
    this.favouritePhotosService.add(imgUrl);
  }

  loadMoreImages() {
    this.loadImages$.next();
  }
}
