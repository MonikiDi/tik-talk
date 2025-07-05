import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Profile } from '@tt/interfaces/profile';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMeComponent {
  profile = input.required<Profile>();
}
