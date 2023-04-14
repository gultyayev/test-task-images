import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { photoResolver } from './photo/photo.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PhotosComponent,
  },
  {
    path: 'photos/:id',
    loadComponent: () =>
      import('./photo/photo.component').then((m) => m.PhotoComponent),
    resolve: {
      img: photoResolver,
    },
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
