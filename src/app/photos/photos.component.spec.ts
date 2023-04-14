import { PhotosComponent } from './photos.component';
import { of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('PhotosComponent', () => {
  let component: PhotosComponent;

  let photosServiceMock: any;
  let favouritePhotosServiceMock: any;

  beforeEach(async () => {
    photosServiceMock = {
      getPhotos: createSpy('#getPhotos').and.returnValue(of([])),
    };
    favouritePhotosServiceMock = {
      add: createSpy('add'),
    };

    component = new PhotosComponent(
      photosServiceMock,
      favouritePhotosServiceMock
    );
  });

  describe('ngOnDestroy', function () {
    it('should complete loadImages$', function () {
      component.ngOnDestroy();

      // isStopped is deprecated, however according to the implementation this is
      // the property that is being changed when we call "complete"
      // so for now there is no other way to check if the stream was completed
      expect((component as any).loadImages$.isStopped).toBeTrue();
    });
  });

  describe('addToFavourites', function () {
    it('should call favouritePhotosService.add with url', function () {
      component.addToFavourites('url');

      expect(favouritePhotosServiceMock.add).toHaveBeenCalledWith('url');
    });
  });
});
