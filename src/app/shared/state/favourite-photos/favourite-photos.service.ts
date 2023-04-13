import { Injectable } from '@angular/core';
import { FavouritePhotosStore } from './favourite-photos.store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class FavouritePhotosService {
  constructor(
    private readonly favouritePhotosStore: FavouritePhotosStore,
    private readonly matSnackBar: MatSnackBar
  ) {}

  add(imgUrl: string) {
    this.favouritePhotosStore.update((state) => {
      state[imgUrl] = true;
    });
    this.matSnackBar.open('Image has been added to the favorites list');
  }

  remove(imgUrl: string) {
    this.favouritePhotosStore.update((state) => {
      delete state[imgUrl];
    });
    this.matSnackBar.open('Image has been removed from the favorites list');
  }
}
