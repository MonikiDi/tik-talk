import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent, NgFor, RouterLink, ProfileCardComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '',
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search',
    },
  ];
}
