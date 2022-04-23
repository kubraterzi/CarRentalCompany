import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listReponseModel';
import { Brand } from '../models/brand';
import {ResponseModel} from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl=environment.apiUrl;
  statusUpdated = new EventEmitter();
  currentBrand : Brand;

  constructor(private httpClient:HttpClient) { }

  getBrands(): Observable<ListResponseModel<Brand>>{
    let newPath= this.apiUrl + 'brands/getall';
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    }




  addBrand(brand:Brand): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'brands/add';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  deleteBrand(brand:Brand): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'brands/delete';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }


  updateBrand(brand:Brand): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'brands/update';
    return this.httpClient.post<ResponseModel>(newPath, brand);
  }

  setCurrentBrand(brand: Brand){
    this.currentBrand = brand;
  }
}
