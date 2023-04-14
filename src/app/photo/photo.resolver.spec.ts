import { TestBed } from '@angular/core/testing';

import { photoResolver } from './photo.resolver';
import { FavouritePhotosQuery } from '../shared/state/favourite-photos/favourite-photos.query';
import { Router } from '@angular/router';
import createSpy = jasmine.createSpy;

describe('PhotoResolver', () => {
  let favouritePhotosQueryMock: any;
  let activatedRouteSnapshotMock: any;
  let routerMock: any;

  beforeEach(() => {
    favouritePhotosQueryMock = {
      getOne: jasmine
        .createSpy('#getOne')
        .and.returnValue({ id: '1', url: '1' }),
    };

    activatedRouteSnapshotMock = {
      paramMap: {
        get: createSpy('#get').and.returnValue({ id: '1', url: '1' }),
      },
    };

    routerMock = {
      navigate: createSpy('#navigate'),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: FavouritePhotosQuery,
          useValue: favouritePhotosQueryMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    });
  });

  it('should return { id: "1", url: "1" }', () => {
    TestBed.runInInjectionContext(() => {
      expect(photoResolver(activatedRouteSnapshotMock)).toEqual({
        id: '1',
        url: '1',
      });
    });
  });

  it('should navigate to home page', function () {
    favouritePhotosQueryMock.getOne.and.returnValue(undefined);

    TestBed.runInInjectionContext(() => {
      expect(photoResolver(activatedRouteSnapshotMock)).toBeUndefined();
    });

    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
