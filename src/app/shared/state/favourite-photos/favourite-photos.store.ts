import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { produce } from 'immer';

// Store favourite images as an object for O(1) access complexity
export interface FavouritePhotosState {
  [imgUrl: string]: true;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'favourite-photos', producerFn: produce })
export class FavouritePhotosStore extends Store<FavouritePhotosState> {
  constructor() {
    super({});
  }
}
