import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Store } from '@ngrx/store';
import * as userActions from "../../state/user/user.actions";
import SignUserForm from '../../helpers/signUserForm';
import { navigateToLogin } from '../../state/status/status.actions';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.valid) {
const user: SignUserForm = {
  email: this.form.get("email")?.value,
  password: this.form.get("password")?.value
};
      this.store.dispatch(userActions.register(user))
    } else {
      console.log("form is invalid", this.form.errors);
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        if (control && control.invalid) {
          console.log(`${field} is invalid`);
        }
      });
    }
  }

  onLogin() {
    this.store.dispatch(navigateToLogin());
  }

}