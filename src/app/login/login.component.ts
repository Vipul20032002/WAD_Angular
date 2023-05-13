import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Route, Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private service:AuthService,private router:Router){
  }
  userdata:any;

  loginform=this.builder.group({
    id:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  })

  proceedlogin(){
    if(this.loginform.valid){
      this.service.Getbycode(this.loginform.value.id).subscribe(result=>{
        this.userdata = result;
        console.log(this.userdata);
        if(this.userdata.password === this.loginform.value.password){
          sessionStorage.setItem('username',this.userdata.id);
          this.router.navigate(['']);
        }else{
          this.toastr.error('Please Enter Correct Password','Wrong Password!');
        }
      })
    }
  }
}
