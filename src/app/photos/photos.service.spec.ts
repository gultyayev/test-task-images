import { PhotosService } from './photos.service';
import { firstValueFrom, of } from 'rxjs';
import createSpy = jasmine.createSpy;

describe('PhotosService', () => {
  let service: PhotosService;

  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: createSpy('#get').and.returnValue(
        of({
          url: 'url',
        })
      ),
    };

    service = new PhotosService(httpClientMock);
  });

  describe('getPhotos', function () {
    it('should return urls', async function () {
      expect(await firstValueFrom(service.getPhotos())).toEqual(
        new Array(9).fill('url')
      );
      expect(httpClientMock.get).toHaveBeenCalledTimes(9);
    });

    it('should return array of empty strings and write errors to console', async function () {
      httpClientMock.get.and.returnValue(of({}));
      spyOn(console, 'error');

      expect(await firstValueFrom(service.getPhotos())).toEqual(
        new Array(9).fill('')
      );
      expect(console.error).toHaveBeenCalledWith('No url for response', {});
    });
  });
});
