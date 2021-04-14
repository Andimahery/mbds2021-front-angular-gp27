import { Component, OnInit } from '@angular/core';
import { User } from '../login/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name="";
  email="";
  role="";
  password="";
  confirmPassword="";
  public error : string = "";
  public signinForm : FormGroup;

  constructor( public authService: AuthService,
    public router: Router,
    public formBuilder: FormBuilder) {
       
/*    this.signinForm = this.formBuilder.group({
      name: ['',Validators.required],
      email: ['',[Validators.email,Validators.required]],
      role: ['',[Validators,Validators.required]],
      password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      confirmPassword: ['',Validators.required]
    });
*/



  }

  ngOnInit(): void {
    


  }

  onSubmit(){
    //console.log(this.email);
    let user = new User();
    user.name=this.name;
    user.email=this.email;
    user.role=this.role;
    user.password=this.password;
   this.authService.register(user).then((result:any)=>{
      //console.log("resultat"+result['message']);
      if(result['auth']){
        this.router.navigate(['']);
      }else{
        this.error=result['message'];
      }
    });

  }

}
