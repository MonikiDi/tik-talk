import {Component, ElementRef, HostListener, inject, input, Renderer2, signal} from '@angular/core';
import {PostService} from '../../ service/post.service';
import {debounce, debounceTime, firstValueFrom, Subject, Subscription, tap} from "rxjs";
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {Debounce} from '../../../../shared/decorators/debounce.decorator';
import {ProfileService} from '../../../../data/services/profile.service';
import {assertNonNullish} from '../../../../shared/utils/assert-non-nullish';
import {normalizationText} from '../../../../shared/utils/normalization-text';


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
  public profileService = inject(ProfileService);
  public hostElement = inject(ElementRef);
  public r2 = inject(Renderer2);
  feed = this.postService.posts
  profile = this.profileService.me
  public parentData = signal('')

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

  onCreatePost(text: string) {
    const profile = this.profile()
    const result = normalizationText(text);
    assertNonNullish(profile, '')
    assertNonNullish(result, '')

    if (this.parentData() === '' || result === '') {
      this.parentData.set('')
      return
    }

    firstValueFrom(this.postService.createPost({
      title: 'Клевый пост',
      content: result,
      authorId: profile.id,
      communityId: 0,
    }).pipe(
      tap(() => {
        this.parentData.set('')
      })
    ))
  }
}

