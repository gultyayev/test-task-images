import { Injectable } from '@angular/core';
import { FavouritePhotosStore } from './favourite-photos.store';

@Injectable({ providedIn: 'root' })
export class FavouritePhotosService {
  constructor(private favouritePhotosStore: FavouritePhotosStore) {}

  add(imgUrl: string) {
    this.favouritePhotosStore.update((state) => {
      state[imgUrl] = true;
    });
  }

  remove(imgUrl: string) {
    this.favouritePhotosStore.update((state) => {
      delete state[imgUrl];
    });
  }
}
