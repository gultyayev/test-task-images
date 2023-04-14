import { Injectable } from '@angular/core';
import { FavouritePhotosStore } from './favourite-photos.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class FavouritePhotosService {
  constructor(
    private readonly favouritePhotosStore: FavouritePhotosStore,
    private readonly matSnackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  add(imgUrl: string) {
    this.favouritePhotosStore.add({
      id: crypto.randomUUID(),
      url: imgUrl,
    });
    this.matSnackBar.open('Image has been added to the favorites list');
  }

  remove(id: string) {
    this.favouritePhotosStore.remove(id);
    this.matSnackBar.open('Image has been removed from the favorites list');
    this.router.navigate(['/favorites']);
  }
}
