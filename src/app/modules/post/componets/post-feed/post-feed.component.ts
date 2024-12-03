import {Component, ElementRef, inject, Renderer2} from '@angular/core';
import {PostInputComponent} from '../post-input/post-input.component';
import {PostComponent} from '../post/post.component';
import {PostService} from '../../ service/post.service';
import {firstValueFrom} from "rxjs";

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
    postService = inject(PostService);
    hostElement = inject(ElementRef);
    r2 = inject(Renderer2);

    feed = this.postService.posts

    constructor() {
        firstValueFrom(this.postService.fetchPost())
    }

    ngAfterViewInit() {
        const {top} = this.hostElement.nativeElement.getBoundingClientRect();

        const height = window.innerHeight - top - 48;
        this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);

      console.log(height);
    }
}
