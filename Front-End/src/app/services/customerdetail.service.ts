import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerDetail } from '../models/customerDetail';
import { ListResponseModel } from '../models/listReponseModel';
import {SingleResponseModel} from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailService {

  apiUrl= environment.apiUrl + 'customers';


  constructor(private httpClient: HttpClient) { }

  getCustomerDetails(): Observable<ListResponseModel<CustomerDetail>> {
    let newPath = this.apiUrl + "/getall"
    return this.httpClient.get<ListResponseModel<CustomerDetail>>(newPath);
  }


  getCustomerByUserId(userId:number) : Observable<SingleResponseModel<CustomerDetail>>{
    let newPath = this.apiUrl + "/getbyuserid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<CustomerDetail>>(newPath);
  }
}
