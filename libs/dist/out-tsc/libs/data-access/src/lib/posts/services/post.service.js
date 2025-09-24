import { __decorate } from "tslib";
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
let PostService = class PostService {
    http = inject(HttpClient);
    baseApiUrl = '/yt-course/';
    // Создать пост
    createPost(payload) {
        return this.http.post(`${this.baseApiUrl}post/`, payload);
    }
    // Обновить пост
    updatePost(postId, payload) {
        return this.http.patch(`${this.baseApiUrl}post/${postId}`, payload);
    }
    // Получить посты
    fetchPosts() {
        return this.http.get(`${this.baseApiUrl}post/`);
    }
    // Удалить пост
    deletePost(postId) {
        return this.http.delete(`${this.baseApiUrl}post/${postId}`);
    }
    // Создать комментарий
    createComment(payload) {
        return this.http.post(`${this.baseApiUrl}comment/`, payload);
    }
    // Удалить комментарий
    deleteComment(postId) {
        return this.http.delete(`${this.baseApiUrl}comment/${postId}`);
    }
    // Поставить лайк
    addLike(postId) {
        return this.http.post(`${this.baseApiUrl}post/like/${postId}`, {});
    }
    // Удалить лайк
    deleteLike(postId) {
        return this.http.delete(`${this.baseApiUrl}post/like/${postId}`);
    }
    // Получить посты UserId
    getPostsUserId(queryParam) {
        let params = new HttpParams();
        params = params.append('user_id', queryParam);
        return this.http.get(`${this.baseApiUrl}post/`, { params: params });
    }
    //  Искуственное получение пост-комментов
    getCommentPostId(postId) {
        return this.http
            .get(`${this.baseApiUrl}post/${postId}`)
            .pipe(map((res) => res.comments));
    }
    // Редактировать пост
    editPost(editPost) {
        return this.http.patch(`${this.baseApiUrl}post/`, editPost);
    }
};
PostService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], PostService);
export { PostService };
//# sourceMappingURL=post.service.js.map