import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from './photos.service';
import { BehaviorSubject, exhaustMap, finalize, scan } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FavouritePhotosService } from '../shared/state/favourite-photos/favourite-photos.service';
import { InfiniteLoaderComponent } from '../shared/components/infinite-loader/infinite-loader.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, InfiniteLoaderComponent],
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
  providers: [PhotosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotosComponent implements OnDestroy {
  protected loadImages$ = new BehaviorSubject<void>(undefined);
  protected loading$ = new BehaviorSubject(true);

  protected images$ = this.loadImages$.pipe(
    exhaustMap(() => {
      this.loading$.next(true);
      return this.photosService
        .getPhotos()
        .pipe(finalize(() => this.loading$.next(false)));
    }),
    scan((acc: string[], value: string[]) => acc.concat(value), [])
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
}
