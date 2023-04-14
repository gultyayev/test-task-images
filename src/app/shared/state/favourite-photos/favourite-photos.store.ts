import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

interface Photo {
  url: string;
  id: string;
}

// Store favourite images as an object for O(1) access complexity
export type FavouritePhotosState = EntityState<Photo, string>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favourite-photos' })
export class FavouritePhotosStore extends EntityStore<FavouritePhotosState> {
  constructor() {
    super({});
  }
}
