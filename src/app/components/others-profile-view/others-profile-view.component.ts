import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { DialogApiService } from '../../services/dialog-api.service';
import { ProfileApiService } from '../../services/profile-api.service';

@Component({
  selector: 'app-others-profile-view',
  imports: [
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './others-profile-view.component.html',
  styleUrl: './others-profile-view.component.scss'
})
export class OthersProfileViewComponent {

  email: string | null;
  fullName: string = "";
  bio: string = "";
  avatarUrl: string = "";
  coverUrl: string = "";

  constructor(
    private profileApi: ProfileApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.email = this.route.snapshot.paramMap.get("id");
    if (!this.email) {
      this.notFound();
      return;
    }



  }

  ngOnInit() {
        this.profileApi.getProfile(this.email!)
      .subscribe(
        (profile) => {
          if (!profile) {
            this.notFound();
            return;
          }

          this.fullName = profile.firstName + " " + profile.lastName;
          this.bio = profile.bio ?? '';
          this.avatarUrl = profile.avatarUrl ?? "";
          this.coverUrl = profile.coverUrl ?? "";
        },
        () => { this.notFound() }
      );
  }

  notFound() {
    this.router.navigate(["/notfound"]);
  }

  onInvite() {
  }

}
