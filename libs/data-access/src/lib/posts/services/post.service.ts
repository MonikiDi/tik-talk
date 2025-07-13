import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CommentCreateDto,
  Post,
  PostComment,
  PostCreateDto,
  PostEdit,
} from '@tt/interfaces/post/post.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http = inject(HttpClient);
  private readonly baseApiUrl = '/yt-course/';

  // Создать пост
  createPost(payload: PostCreateDto) {
    return this.http.post<Post>(`${this.baseApiUrl}post/`, payload);
  }

  // Обновить пост
  updatePost(postId: number, payload: PostEdit) {
    return this.http.patch<Post>(`${this.baseApiUrl}post/${postId}`, payload);
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

  // Удалить комментарий
  deleteComment(postId: number) {
    return this.http.delete<void>(`${this.baseApiUrl}comment/${postId}`);
  }

  // Поставить лайк
  addLike(postId: number) {
    return this.http.post<{ message: string }>(
      `${this.baseApiUrl}post/like/${postId}`,
      {}
    );
  }

  // Удалить лайк
  deleteLike(postId: number) {
    return this.http.delete<{ message: string }>(
      `${this.baseApiUrl}post/like/${postId}`
    );
  }

  // Получить посты UserId
  getPostsUserId(queryParam: number) {
    let params = new HttpParams();
    params = params.append('user_id', queryParam);
    return this.http.get<Post[]>(`${this.baseApiUrl}post/`, { params: params });
  }

  //  Искуственное получение пост-комментов
  getCommentPostId(postId: number) {
    return this.http
      .get<Post>(`${this.baseApiUrl}post/${postId}`)
      .pipe(map((res) => res.comments));
  }

  // Редактировать пост
  editPost(editPost: PostEdit) {
    return this.http.patch<PostEdit>(`${this.baseApiUrl}post/`, editPost);
  }
}
