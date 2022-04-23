import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {LoginModel} from '../models/loginModel';
import {Observable} from 'rxjs';
import {TokenModel} from '../models/tokenModel';
import {HttpClient} from '@angular/common/http';
import {SingleResponseModel} from '../models/singleResponseModel';
import {RegisterModel} from '../models/registerModel';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from '../models/user';
import {LocalStorageService} from './local-storage.service';
import {CustomerDetail} from '../models/customerDetail';
import {CustomerDetailService} from './customerdetail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + 'auth/';
  user: User;
  decodedTokenKey: any;
  token :string | null= ""

  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService, private  localStorageService: LocalStorageService, private customerService:CustomerDetailService) {
  }


  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }


  register(registerModel: RegisterModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel);
  }


  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);
  }


  getUser() {
    let decodedToken = this.decodedToken(this.localStorageService.getToken());
    console.log(decodedToken)

    if (decodedToken) {
      if(this.loggedIn()){
        let tokenInfoName = Object.keys(decodedToken).filter(u => u.endsWith('/name'))[0];
        let userName = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(u => u.endsWith('/nameidentifier'))[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(u => u.endsWith('/role'))[0];
        let roles = decodedToken[claimInfo];


        let tokenInfoEmail = decodedToken.email;

        this.user = {
          userName: userName,
          userId: userId,
          email: tokenInfoEmail,
          roles: roles,
          companyName :"",
          customerId : 0
        };

        this.getCustomerUserId(userId);
      }
    }
    return this.user;
  }


  loggedIn() {
    if (this.localStorageService.getToken()) {
      return this.jwtHelper.isTokenExpired();
    } else {
      return false;
    }
  }



  isAdmin() {
    let isAdmin = false
    if (this.loggedIn()) {
      let claims = this.user.roles?.toString().split(',') // string bir dizi olarak döndürüldüğü için, tek bir claim olduğunda object olarak dönüyor ve bu sebeple cast edemiyor.
      //Haliyle isAdmin() metodu çalışmıyor. Map te hata veriyor. bu sebeple önce gelen objeyi tamamen string e çevirip varsa virgüllerden ayırıp yeni bir dizi oluşturarak onu
     // geziyoruz.

      claims?.map(role => {
        if (role.toLocaleLowerCase().indexOf("admin") !== -1) {
          isAdmin = true;
        }
      })
    }
    return isAdmin;
  }

  logOut(){
    this.localStorageService.removeToken();
  }


  getCustomerUserId(userId : number){
    this.customerService.getCustomerByUserId(userId).subscribe(response =>{
      this.user.customerId = response.data.customerID
      this.user.companyName = response.data.companyName;
    })
  }


}
