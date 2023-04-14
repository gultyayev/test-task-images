import { InfiniteLoaderComponent } from './infinite-loader.component';
import createSpy = jasmine.createSpy;

describe('InfiniteLoaderComponent', () => {
  let component: InfiniteLoaderComponent;

  let intersectionObserverMock: any;

  beforeEach(() => {
    window.IntersectionObserver = class MockObserver {
      observe = createSpy('#observe');
      disconnect = createSpy('#disconnect');

      constructor(private callback: any, private options: any) {}
    } as any;

    component = new InfiniteLoaderComponent({ nativeElement: 'test' });
  });

  it('should create intersection observer', () => {
    expect((component as any).observer.options).toEqual({ threshold: 0.8 });
  });

  describe('ngAfterViewInit', function () {
    it('should observe on elementRef', function () {
      component.ngAfterViewInit();
      expect((component as any).observer.observe).toHaveBeenCalledWith('test');
    });
  });

  describe('ngOnDestroy', function () {
    it('should call observer.disconnect', function () {
      component.ngOnDestroy();
      expect((component as any).observer.disconnect).toHaveBeenCalled();
    });
  });
});
