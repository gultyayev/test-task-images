import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FavouritePhotosService } from '../shared/state/favourite-photos/favourite-photos.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss'],
  standalone: true,
  imports: [AsyncPipe, NgIf, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoComponent {
  protected img$ = this.activatedRoute.data.pipe(map((d) => d['img']));

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly favouritePhotosService: FavouritePhotosService
  ) {}

  removeFromFavourites(id: string) {
    this.favouritePhotosService.remove(id);
  }
}
