import { Injectable } from '@angular/core';
import { map, Observable, switchMap, timer, zip } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class PhotosService {
  constructor(private httpClient: HttpClient) {}

  getPhotos(size = 9): Observable<string[]> {
    const imagesLinks = new Array(size).fill('https://picsum.photos/200/300');
    const delay = Math.floor(Math.random() * (300 - 200 + 1) + 200);

    return timer(delay).pipe(
      switchMap(() =>
        zip(
          imagesLinks.map((link) =>
            // Make requests for each link to have it generated hash to a unique image
            // Return those URLs so that user can add images to favourites
            this.httpClient.get(link, {
              responseType: 'arraybuffer',
              // Observe response to get its URL after redirects
              observe: 'response',
            })
          )
        )
      ),
      map((responses: HttpResponse<unknown>[]) =>
        responses.map((response) => {
          if (!response.url) {
            console.error('No url for response', response);
            return '';
          }

          return response.url;
        })
      )
    );
  }
}
