import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {
  FavouritePhotosState,
  FavouritePhotosStore,
} from './favourite-photos.store';

@Injectable({ providedIn: 'root' })
export class FavouritePhotosQuery extends QueryEntity<FavouritePhotosState> {
  constructor(protected override store: FavouritePhotosStore) {
    super(store);
  }

  getList() {
    return this.getAll();
  }

  getOne(id: string) {
    return this.getEntity(id);
  }
}
