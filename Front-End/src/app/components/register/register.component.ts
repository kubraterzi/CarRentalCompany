import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from '../../services/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService,
              private localStorageService:LocalStorageService, private router:Router) { }


  ngOnInit(): void {
    this.createRegisterForm();
  }


  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required]
    })
  }


  register(){
    if (this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.localStorageService.saveToken(response.data.token)
        this.registerForm.reset();
        this.authService.getUser()
        this.router.navigate(['/']);
        this.toastrService.success('Registered.')
      }, responseError =>{
        if(responseError.error.Errors.length>0){
          for (let i=0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Validation Exception')
          }
        }
      })
    }else{
      this.toastrService.error('Form Invalid.')
    }
  }
}
