import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavouritePhotosQuery } from '../shared/state/favourite-photos/favourite-photos.query';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent {
  protected images = this.favouritePhotosQuery.getList();

  constructor(private readonly favouritePhotosQuery: FavouritePhotosQuery) {}
}
