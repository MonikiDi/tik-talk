import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AvatarCircleComponent } from '@tt/common-ui';
import { Profile } from '@tt/interfaces/profile';
import { Address } from '../../../../../delivery-page/src/lib/services/mock.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [AvatarCircleComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
  addressMe: Address = {};
  addressMePrint = '';

  isJsonString(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    this.addressMe = JSON.parse(str);
    this.addressMePrint = `
    ${this.addressMe.city ? `Город ${this.addressMe.city},` : ''}
    ${this.addressMe.street ? `Улица ${this.addressMe.street},` : ''}
    ${this.addressMe.building ? `Дом ${this.addressMe.building},` : ''}
    ${this.addressMe.apartment ? `Квартира ${this.addressMe.apartment}` : ''}
    `;
    return true;
  }
}
