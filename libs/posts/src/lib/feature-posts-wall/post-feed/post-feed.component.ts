import {
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import {
  debounce,
  debounceTime,
  firstValueFrom,
  Subject,
  Subscription,
  tap,
} from 'rxjs';

// import { ProfileService } from '@tt/profile';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../data/services/post.service';

import { GlobalStoreService, normalizationText } from '@tt/shared';
import { Debounce } from '@tt/shared';
import { assertNonNullish } from '@tt/shared';
import { Profile } from '@tt/interfaces/profile';
import { Store } from '@ngrx/store';
import { postsActions, selectPosts } from '../../data/store';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit {
  public postService = inject(PostService);
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  #globalStoreService = inject(GlobalStoreService);
  public readonly store = inject(Store);
  feed = this.store.selectSignal(selectPosts);
  profile = this.#globalStoreService.me;
  public parentData = signal('');

  ngOnInit() {
    this.store.dispatch(postsActions.loadPosts());
  }
  constructor() {
    // firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    this.resizeFeed();
  }

  // 1 Метод c debounceTime
  // private readonly resize = new Subject<void>()
  //
  // @HostListener('window: resize')
  // public onWindowResize() {
  //   this.resize.next(undefined)
  // }
  // private subscription: Subscription = Subscription.EMPTY;
  // public ngOnInit() {
  //   this.subscription =  this.resize.pipe(debounceTime(20)).subscribe(() => {
  //     this.resizeFeed()
  //
  //
  //   })
  //   console.log('subscribe')
  // }
  // public ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  //   console.log('unsubscribe')
  // }

  // 2 Метод c Декоратором
  @Debounce(20)
  @HostListener('window: resize')
  onWindowResize() {
    this.resizeFeed();
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
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 48;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
    // console.log(height);
  }

  onCreatePost(text: string) {
    const profile = this.profile();
    const result = normalizationText(text);
    assertNonNullish(profile, '');
    assertNonNullish(result, '');

    if (this.parentData() === '' || result === '') {
      this.parentData.set('');
      return;
    }

    // firstValueFrom(
    //   this.postService
    //     .createPost({
    //       title: 'Клевый пост',
    //       content: result,
    //       authorId: profile.id,
    //       communityId: 0,
    //     })
    //     .pipe(
    //       tap(() => {
    //         this.parentData.set('');
    //       })
    //     )
    // );
  }
}
