import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from './photos.service';
import { BehaviorSubject, exhaustMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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

  images$ = this.loadImages$.pipe(
    exhaustMap(() => this.photosService.getPhotos())
  );

  constructor(private photosService: PhotosService) {}

  ngOnDestroy() {
    this.loadImages$.complete();
  }

  loadMoreImages() {
    this.loadImages$.next();
  }
}
