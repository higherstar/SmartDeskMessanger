import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AppConfig } from '../../app/app.config';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthServiceProvider {
  private access_token: string = null;

  constructor(public http: Http, private appConfig: AppConfig, private storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
    this.storage.get('access_token')
      .then(data => {
        this.access_token = data;
      });
  }

  login(credentials) {
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('username', credentials.username.trim());
    urlSearchParams.append('password', credentials.password.trim());
    urlSearchParams.append('token', credentials.token.trim());
    let body = urlSearchParams.toString();

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let options = new RequestOptions({headers: headers});

      this.http.post(this.appConfig.apiBaseUrl+'login', body, options)
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getauthenticated(): boolean {
    return this.access_token !== null;
  }
}
