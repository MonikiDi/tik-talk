import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';

import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { assertNonNullish, Debounce, normalizationText } from '@tt/shared';
import { Store } from '@ngrx/store';
import {
  postsActions,
  selectPosts,
  selectPostsUserId,
  selectProfileMe,
} from '@tt/data-access';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnInit, AfterViewInit {
  public hostElement = inject(ElementRef);
  private readonly activatedRoute = inject(ActivatedRoute);
  public r2 = inject(Renderer2);
  public readonly store = inject(Store);
  posts = this.store.selectSignal(selectPosts);
  postsUserId = this.store.selectSignal(selectPostsUserId);
  profile = this.store.selectSignal(selectProfileMe);
  public hasMe = this.activatedRoute.snapshot.params['id'] === undefined;

  feedSort = computed(() => {
    if (!this.hasMe) {
      return this.postsUserId()
        .slice()
        .sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        });
    } else {
      return this.posts()
        .slice()
        .sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        });
    }
  });

  public parentData = signal('');

  ngOnInit() {
    this.store.dispatch(postsActions.loadPosts());
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
    this.store.dispatch(
      postsActions.createPost({
        title: 'Клевый пост',
        content: result,
        authorId: profile.id,
        communityId: 0,
      })
    );
    this.parentData.set('');
  }
}
