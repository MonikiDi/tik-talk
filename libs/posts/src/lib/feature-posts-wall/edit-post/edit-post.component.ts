import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [
  ],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostComponent {
  // onSubmit(): void {
  //   if (this.postForm.valid) {
  //     const updatedPost = { ...this.post, ...this.postForm.value };
  //     this.http.put(`/api/posts/${this.postId}`, updatedPost).subscribe(() => {
  //       this.router.navigate(['/posts', this.postId]); // Перенаправление на страницу просмотра поста
  //     });
  //   }
  // }
}
