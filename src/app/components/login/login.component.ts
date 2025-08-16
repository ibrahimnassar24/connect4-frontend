import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as userActions from '../../state/user/user.actions';
import { navigateToRegister } from '../../state/status/status.actions';
import { AuthApiService } from '../../services/auth-api.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private auth: AuthApiService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
    );
  }


  onSubmit() {
    if (this.form.valid) {
      const temp = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.store.dispatch(userActions.logIn(temp));
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

  onLoginWithGoogle() {
    this.auth.loginWithGoogle();
  }

  onRegister() {
    this.store.dispatch(navigateToRegister());
  }
}