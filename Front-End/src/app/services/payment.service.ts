import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CarRental} from '../models/carRental';
import {Payment} from '../models/payment';
import {ResponseModel} from '../models/ResponseModel';
import {CarRentalDetailService} from './carrentaldetail.service';
import {AuthService} from './auth.service';
import {CardService} from './card.service';
import {Card} from '../models/card';

@Injectable({
  providedIn: 'root',
})

export class PaymentService {

  apiUrl = environment.apiUrl + 'payments/';
  rental: CarRental;
  payment: Payment;
  totalPrice: number;
  cardModel: Card;

  cardAddRequest: boolean;


  constructor(
    private httpClient: HttpClient,
    private carRentalService: CarRentalDetailService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private cardService: CardService
  ) {
  }


  addPayment(payment: Payment): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, payment);
  }


  // setPaymentModel(cardNumber:string) {
  //   this.payment = <Payment>{
  //     customerId:this.authService.user.customerId,
  //     cardNumber:cardNumber,
  //     totalAmount:this.totalPrice
  //   }
  //
  //   return this.payment
  //
  // }

  setPaymentModel(card: Card) {
    this.payment = <Payment> {
      customerId: this.authService.user.customerId,
      cardNumber: card.cardNumber,
      totalAmount: this.totalPrice
    };
    return this.payment;

  }

  //its OK
  // addRentalAfterPaymentAndCardInfoCompleted(card: Card) {
  //   this.cardService.addCard(card).subscribe(response => {
  //     this.setPaymentModel(card);
  //     this.addPayment(this.payment).subscribe(response => {
  //       this.carRentalService.addRental(this.rental).subscribe(response => {
  //         this.toastrService.success('Success.');
  //         window.location.reload()
  //       },responseError => {
  //         this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.')
  //       });
  //     });
  //   }, responseError=>{
  //     this.toastrService.error("Invalid credit card informations.")
  //   });
  // }


  setRental(rental: CarRental) {
    this.rental = rental;
  }


  addRentalAfterPaymentAndCardInfoCompleted(card: Card) {
    if (this.cardAddRequest === true) {
      this.cardService.addCard(card).subscribe(response => {
        this.setPaymentModel(card);
        this.addPayment(this.payment).subscribe(response => {
          this.carRentalService.addRental(this.rental).subscribe(response => {
            this.toastrService.success('Success.');
          }, responseError => {
            this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
          });
        });
      }, responseError => {
        this.toastrService.error('Invalid credit card informations.');
      });
    }else{
      this.setPaymentModel(card);
      this.addPayment(this.payment).subscribe(response => {
        this.carRentalService.addRental(this.rental).subscribe(response => {
          this.toastrService.success('Success.');
        }, responseError => {
          this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
        });
      })
    }
  }
}
