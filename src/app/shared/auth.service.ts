import { Injectable } from '@angular/core';
import { User } from '../login/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  admin = false;
  

  uri = "http://localhost:8010/api";

  public headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'});

  constructor(private http: HttpClient) { }

  logIn(user: User): Promise<any> {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    //if (login === 'admin') this.admin = true;


    this.loggedIn = true;
    return new Promise((resolve, reject) => {
      this.http.post(this.uri + '/login', user).subscribe(res => {
        resolve(res);
       
        if(res["role"]=="admin"){
         // console.log("true");
          this.admin=true; 
        }
      });
    });
  }



  
  register(user: User): Promise<any> {
    // typiquement, acceptera en paramètres un login et un password
    // vérifier qu'ils sont ok, et si oui, positionner la propriété loggedIn à true
    // si login/password non valides, positionner à false;

    //if (login === 'admin') this.admin = true;

    return new Promise((resolve, reject) => {
      this.http.post(this.uri + '/register', user).subscribe(res => {
        resolve(res);
      });
    });
  }
  

  logOut() {
    this.loggedIn = false;
    this.admin = false;
  }

  // exemple d'utilisation :
  // isAdmin.then(admin => { console.log("administrateur : " + admin);})
  isAdmin() {
    return new Promise((resolve, reject) => {
      resolve(this.admin);
    });
  }
}
