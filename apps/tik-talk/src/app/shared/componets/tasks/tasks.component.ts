import { Component, inject, input } from '@angular/core';
import { ProfileService } from '../../../../../../../libs/profile/src/lib/data/services/profile.service';
import { Profile } from '@tt/profile';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  profile = input.required<Profile>();
}
