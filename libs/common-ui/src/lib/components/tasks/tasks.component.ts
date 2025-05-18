import { Component, input } from '@angular/core';
import {Profile} from '@tt/interfaces/profile';

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
