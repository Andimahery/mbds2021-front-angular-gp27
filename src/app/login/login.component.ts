import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nom="";
  email="";
  password="";
  public error : string = "";
  public loginForm : FormGroup;

  constructor(private authService:AuthService,
    private router:Router, private formBuilder: FormBuilder) {

      this.loginForm = this.formBuilder.group({
        email: ['',[Validators.email,Validators.required]],
        password: ['',Validators.required]
      });
    }


  ngOnInit(): void {
  }

  onSubmit(){
    //console.log(this.email);
    let user = new User();
    user.email=this.email;
    user.password=this.password;
    this.authService.logIn(user).then((result:any)=>{
      console.log("resultat"+result['message']);
      if(result['auth']){
        this.router.navigate(['/home']);
      }else{
        this.error=result['message'];
      }
    })

  }

}
