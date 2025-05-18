import { Component, input } from '@angular/core';
import { Profile } from '@tt/profile';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  profile = input.required<Profile>();
}
