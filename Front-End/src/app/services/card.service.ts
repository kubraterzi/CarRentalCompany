import {Injectable} from '@angular/core';
import {CarRental} from '../models/carRental';
import {environment} from '../../environments/environment';
import {Card} from '../models/card';
import {HttpClient} from '@angular/common/http';
import {ResponseModel} from '../models/ResponseModel';
import {Observable} from 'rxjs';
import {Payment} from '../models/payment';
import {PaymentService} from './payment.service';
import {CarRentalDetailService} from './carrentaldetail.service';
import {ToastrService} from 'ngx-toastr';
import {ListResponseModel} from '../models/listReponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl = environment.apiUrl + 'cards/';



  constructor(private httpClient: HttpClient, private carRentalService: CarRentalDetailService, private toastrService: ToastrService) {
  }

  addCard(card: Card): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }


  getCardsByCustomer(customerId: number): Observable<ListResponseModel<Card>> {
    let newPath = this.apiUrl + 'getcardsbycustomerid?customerId=' + customerId;
    return this.httpClient.get<ListResponseModel<Card>>(newPath);
  }

}

