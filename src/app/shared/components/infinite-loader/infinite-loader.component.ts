import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-infinite-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './infinite-loader.component.html',
  styleUrls: ['./infinite-loader.component.scss'],
})
export class InfiniteLoaderComponent implements AfterViewInit, OnDestroy {
  @Output() shouldLoad = new EventEmitter<void>();

  private readonly observer = new IntersectionObserver(
    () => this.shouldLoad.emit(),
    { threshold: 0.8 }
  );

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
