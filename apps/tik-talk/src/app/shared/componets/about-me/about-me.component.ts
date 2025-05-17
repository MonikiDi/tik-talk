import { Component, input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';

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
