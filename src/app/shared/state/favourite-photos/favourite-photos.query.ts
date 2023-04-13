import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import {
  FavouritePhotosState,
  FavouritePhotosStore,
} from './favourite-photos.store';

@Injectable({ providedIn: 'root' })
export class FavouritePhotosQuery extends Query<FavouritePhotosState> {
  constructor(protected override store: FavouritePhotosStore) {
    super(store);
  }
}
