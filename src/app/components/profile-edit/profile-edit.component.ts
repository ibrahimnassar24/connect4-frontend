import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectUserEmail } from '../../state/user/user.selectors';
import * as profileActions from "../../state/profile/profile.actions";
import Profile from '../../state/profile/profile.model';

@Component({
  selector: 'app-profile-edit',
    imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss'
})
export class ProfileEditComponent {
  form: FormGroup;
  userEmail: string | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store
  ) {

    this.store.select(selectUserEmail).subscribe(v => this.userEmail = v);

    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [{ value: this.userEmail ?? "", disabled: true }],
      avatarUrl: [''],
      bio: [""]
    });

  }

  onSubmit() {

    const profile = {
      firstName: this.form.get("firstName")?.value,
      lastName: this.form.get("lastName")?.value,
      email: this.form.get("email")?.value,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatarUrl: this.form.get("avatarUrl")?.value,
      bio: this.form.get("bio")?.value
    };
    this.store.dispatch(profileActions.createProfile(profile))
  }
}
