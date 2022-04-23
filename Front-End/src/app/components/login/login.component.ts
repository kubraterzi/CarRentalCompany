import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  decodedToken:any;
  loginForm : FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService,
              private localStorageService:LocalStorageService, private jwtHelper: JwtHelperService,private  router : Router) { }

  ngOnInit(): void {
    this.addLoginForm();
  }

  addLoginForm(){
    this.loginForm = this.formBuilder.group({
      'email' : ['', Validators.required],
      'password' : ['', Validators.required]
    })
  }


  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.localStorageService.saveToken(response.data.token)
        this.authService.decodedTokenKey = this.authService.decodedToken(response.data.token)
        this.authService.getUser()
        this.router.navigate(["/"]) // '/' anasayfa ya yönlendirir.
        this.toastrService.success('Logged In.')
      }, responseError => {
      this.toastrService.error(responseError.errors, 'Password Invalid.')
      })
    }else{
      this.toastrService.error("Form invalid.")
    }
  }


}
