import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigsService } from './configs.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private url: string;
  constructor(
    private http: HttpClient,
    private configs: ConfigsService
  ) {
    this.url = this.configs.uploadUrl;
  }

  uploadAvatar(avatar: Blob) {
    return this.uploadImage(avatar, "avatar");
  }

  uploadCover(cover: Blob) {
    return this.uploadImage(cover, "cover");
  }
  
  private uploadImage(image: Blob, imageType: string) {
    const url = this.url + imageType;
    const formData = new FormData();
    formData.append('file', image, "image.png");
    const res = this.http.post<{ url: string}>(
      url,
      formData,
      { withCredentials: true}
    );
    return res;
  }
}