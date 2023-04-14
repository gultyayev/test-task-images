import { PhotoComponent } from './photo.component';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('PhotoComponent', () => {
  let component: PhotoComponent;

  let activatedRouteMock: any;
  let favouritePhotosServiceMock: any;

  beforeEach(async () => {
    activatedRouteMock = {
      data: of({
        img: {
          id: '1',
          url: '1',
        },
      }),
    };
    favouritePhotosServiceMock = {
      remove: createSpy('#remove'),
    };

    component = new PhotoComponent(
      activatedRouteMock,
      favouritePhotosServiceMock
    );
  });

  describe('removeFromFavourites', () => {
    it('should call favouritePhotosService.remove with id', function () {
      component.removeFromFavourites('id');

      expect(favouritePhotosServiceMock.remove).toHaveBeenCalledWith('id');
    });
  });
});
