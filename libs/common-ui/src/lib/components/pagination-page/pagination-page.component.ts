import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {NgForOf, NgIf } from '@angular/common';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-pagination-page',
  standalone: true,
  imports: [NgForOf, NgIf, SvgIconComponent],
  templateUrl: './pagination-page.component.html',
  styleUrl: './pagination-page.component.scss',
})
export class PaginationPageComponent implements OnChanges {
  @Input() current: number = 0;
  @Input() total: number = 0;
  @Input() disabled: boolean = true;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];


  ngOnChanges(changes: SimpleChanges): void {
    // if (
    //   (changes.current && changes.current.currentValue) ||
    //   (changes.total && changes.total.currentValue)
    // ) {
      this.pages = this.getPages(this.current, this.total);
    // }
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page);
  }

  public onNext(): void {
    this.next.emit(this.current);
  }

  public onPrevious(): void {
    this.previous.next(this.current);
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current >= 5) {
      if (current >= total - 3) {
        return [
          1,
          -1,
          total - 6,
          total - 5,
          total - 4,
          total - 3,
          total - 2,
          total - 1,
          total,
        ];
      } else {
        return [
          1,
          -1,
          current - 2,
          current - 1,
          current,
          current + 1,
          current + 2,
          -1,
          total,
        ];
      }
    }

    return [1, 2, 3, 4, 5, 6, 7, -1, total];
  }
}
