import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDto,
  Post,
  PostCreateDto,
  PostComment,
} from '@tt/interfaces/post/post.interface';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  fetchPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`);
  }

  deletePost(postId: number) {
    return this.http.delete<Post>(`${this.baseApiUrl}post/${postId}`).pipe(
      tap(() => {
        return this.fetchPosts();
      })
    );
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<PostComment>(`${this.baseApiUrl}comment/`, payload);
  }

  addLike(postId: number) {
    return this.http.post<Post>(`${this.baseApiUrl}post/like/${postId}`, {});
  }

  //  Искуственное получение постов
  getCommentPostId(postId: number) {
    return this.http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }
}
