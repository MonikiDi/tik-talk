import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CommentCreateDto,
  Post,
  PostComment,
  PostCreateDto,
} from '@tt/interfaces/post/post.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = 'https://icherniakov.ru/yt-course/';

  // Создать пост
  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload);
  }

  // Получить посты
  fetchPosts() {
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`);
  }

  // Удалить пост
  deletePost(postId: number) {
    return this.http.delete<void>(`${this.baseApiUrl}post/${postId}`);
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
