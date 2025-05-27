import { inject, Injectable } from '@angular/core';
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

  // Создать пост
  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload).pipe(
      switchMap(() => {
        return this.fetchPosts();
      })
    );
  }

  // Получить посты
  fetchPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`);
  }
  // Получить посты пользователя по userId
  // fetchPostsUserId(userId: number) {
  //   return this.http.get<Post[]>(`${this.baseApiUrl}post/`, {
  //     user_id: userId,
  //   });
  // }

  // Удалить пост
  deletePost(postId: number) {
    return this.http.delete<Post>(`${this.baseApiUrl}post/${postId}`).pipe(
      tap(() => {
        return this.fetchPosts();
      })
    );
  }

  // Создать комментарий
  createComment(payload: CommentCreateDto) {
    return this.http.post<PostComment>(`${this.baseApiUrl}comment/`, payload);
  }

  // Поставить лайк
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
