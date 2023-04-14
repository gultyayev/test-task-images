import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { FavouritePhotosQuery } from '../shared/state/favourite-photos/favourite-photos.query';

export function photoResolver(route: ActivatedRouteSnapshot) {
  const img = inject(FavouritePhotosQuery).getOne(
    route.paramMap.get('id') as string
  );

  if (!img) {
    // Redirect to the home page in case there is no such ID
    inject(Router).navigate(['/']);
    return;
  }

  return img;
}
