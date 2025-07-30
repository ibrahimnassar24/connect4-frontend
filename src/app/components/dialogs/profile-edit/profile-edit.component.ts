import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import * as profileSelectors from '../../../state/profile/profile.selectors';
import * as profileActions from "../../../state/profile/profile.actions";
import Profile from '../../../state/profile/profile.model';
import { ProfileFormData } from '../../../state/helpers/ProfileFormData';

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
  firstName: string | null = null;
  lastName: string | null = null;
  bio: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  
  ) {

    this.store.select(profileSelectors.selectBio).subscribe(v => this.bio = v);
    this.store.select(profileSelectors.selectFirstName).subscribe(v => this.firstName = v);
    this.store.select(profileSelectors.selectLastName).subscribe(v => this.lastName = v);

    this.form = this.formBuilder.group({
      firstName: [this.firstName ?? "", [Validators.required]],
      lastName: [this.lastName ?? "", [Validators.required]],
      bio: [this.bio ?? ""]
    });

  }

  onSubmit() {

    const data: ProfileFormData = {
      firstName: this.form.get("firstName")?.value,
      lastName: this.form.get("lastName")?.value,
      bio: this.form.get("bio")?.value
    };
    if(this.data?.dialogType === "edit") {
      this.store.dispatch(profileActions.updateProfile({ data }))
    } else {
      this.store.dispatch(profileActions.createProfile({ data }))
    }
    this.dialogRef.close();
  }
}
