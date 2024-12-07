import {Component, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {PostService} from '../../ service/post.service';
import {debounce, debounceTime, firstValueFrom, Subject} from "rxjs";
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {Debounce} from '../../../../shared/decorators/debounce.decorator';


@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [
    PostInputComponent,
    PostComponent
  ],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})


export class PostFeedComponent {
  public postService = inject(PostService);
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  feed = this.postService.posts

  constructor() {
    firstValueFrom(this.postService.fetchPosts())
  }

  ngAfterViewInit() {
    this.resizeFeed()
  }


  // 1 Метод c debounceTime
  // private readonly resize = new Subject<void>()
  //
  // @HostListener('window: resize')
  // onWindowResize() {
  //   this.resize.next(undefined)
  // }
  //
  // public ngOnInit() {
  //   this.resize.pipe(debounceTime(20)).subscribe(() => {
  //     this.resizeFeed()
  //   })
  // }

  // 2 Метод c Декоратором
  @Debounce(20)
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed()
  }

  // 3 Метод с функцией debounce
  // @HostListener('window: resize')
  // onWindowResize() {
  //   this.func()
  // }
  // public func = this.debounce(this.resizeFeed.bind(this), 20)
  // public debounce<Params extends any[]>(
  //   func: (...args: Params) => any,
  //   timeout: number,
  // ): (...args: Params) => void {
  //   let timer: any
  //   return (...args: Params) => {
  //     clearTimeout(timer)
  //     timer = setTimeout(() => {
  //       func(...args)
  //     }, timeout)
  //   }
  // }

  public resizeFeed() {
    const {top} = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`)
    console.log(height);
  }


}


