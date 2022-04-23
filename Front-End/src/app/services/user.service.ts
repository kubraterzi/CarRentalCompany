import { Injectable } from '@angular/core';
import {UserInfoModel} from '../models/userInfoModel';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ChangePasswordModel} from '../models/changePasswordModel';
import {ResponseModel} from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl=environment.apiUrl + 'users/'

  constructor(private httpClient:HttpClient) { }

  updateUserInfos(userInfo:UserInfoModel):Observable<ResponseModel>{
    let newPath =this.apiUrl + 'updateuserinfos';
    return this.httpClient.post<ResponseModel>(newPath,userInfo)
  }

  changeUserPassword(changePasswordInfos:ChangePasswordModel):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'changeuserpassword';
    return this.httpClient.post<ResponseModel>(newPath, changePasswordInfos)
  }

}
