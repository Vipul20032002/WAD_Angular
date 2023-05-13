import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private builder:FormBuilder,private toastr:ToastrService,
    private service:AuthService,private router:Router){
  }

  registerform = this.builder.group({
    id:this.builder.control('',Validators.compose([Validators.required,Validators.minLength(5)])),
    name:this.builder.control('',Validators.required),
    mail:this.builder.control('',Validators.compose([Validators.required,Validators.email])),
    phone:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[0-9]).{10}')])),
    password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    gender:this.builder.control('Male',Validators.required),
  })

  proceedregistration(){
    if(this.registerform.valid){
      this.service.Proceedregister(this.registerform.value).subscribe(result => {
        this.toastr.success('Registered Successfully!');
        this.router.navigate(['login']);
      });
    }

    else{
      this.toastr.warning('Please enter valid data!')
    }
  }

}
