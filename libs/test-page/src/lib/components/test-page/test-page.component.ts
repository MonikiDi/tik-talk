import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { NoReactValidator } from '../../directive/no-react.validator';

@Component({
  selector: 'tt-test-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NoReactValidator],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss',
})
export class TestPageComponent {
  person = {
    name: '',
    lastName: '',
    address: {
      street: '',
      building: 0
    }
  }

  hobby = ''

  onChange(value: any) {
    this.person.name = value;
    // console.log(value);
  }

  // onSubmit(event: SubmitEvent) {
  //   console.log(event.target);
  //   //@ts-ignore
  //   console.log(window.ng.getDirectives(event.target)[2].value);
  // }
  onSubmit(form: NgForm) {
    console.log(form);
  }
}
