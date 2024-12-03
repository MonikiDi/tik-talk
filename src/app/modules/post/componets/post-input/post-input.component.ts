import {Component, inject, Renderer2} from '@angular/core';
import {AvatarCircleComponent} from '../../../../common-ui/avatar-circle/avatar-circle.component';
import {ProfileService} from '../../../../data/services/profile.service';
import {NgIf} from '@angular/common';
import {SvgIconComponent} from '../../../../common-ui/svg-icon/svg-icon.component';
import {PostService} from "../../../../data/services/post.service";
import {FormsModule} from "@angular/forms";
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-post-input',
    standalone: true,
    imports: [
        AvatarCircleComponent,
        NgIf,
        SvgIconComponent,
        FormsModule
    ],
    templateUrl: './post-input.component.html',
    styleUrl: './post-input.component.scss'
})
export class PostInputComponent {
    profile = inject(ProfileService).me
    postService = inject(PostService)
    r2 = inject(Renderer2)
    postText = ''


    onTextAreaInput(event: Event) {
        const textArea = event.target as HTMLTextAreaElement;

        this.r2.setStyle(textArea, 'height', 'auto');
        this.r2.setStyle(textArea, 'height', textArea.scrollHeight + 'px');
    }

    onCreatePost() {
        if (!this.postText) return
            firstValueFrom(this.postService.createPost({
                title: 'Клевый пост',
                content: this.postText,
                authorId: this.profile()!.id,
                communityId: 0,
            })).then(()=>{
                this.postText = ''
            })
    }
}
