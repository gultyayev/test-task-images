import { FavoritesComponent } from './favorites.component';
import createSpy = jasmine.createSpy;

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;

  let favouritePhotosQueryMock: any;

  beforeEach(() => {
    favouritePhotosQueryMock = {
      getList: createSpy('#getList'),
    };

    component = new FavoritesComponent(favouritePhotosQueryMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
