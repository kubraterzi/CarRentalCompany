import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Payment} from 'src/app/models/payment';
import {CarRentalDetailService} from 'src/app/services/carrentaldetail.service';
import {PaymentService} from 'src/app/services/payment.service';
import {AuthService} from '../../services/auth.service';
import {CardService} from '../../services/card.service';
import {Card} from '../../models/card';
import {CarRental} from '../../models/carRental';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  @Input() customer: number;
  paymentAddForm: FormGroup;
  payment: Payment;
  rental: CarRental;
  totalPrice = this.paymentService.totalPrice;
  checked:boolean;
  savedCards:Card[];
  currentCard :Card;


  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private cardService: CardService,
    private carRentalService: CarRentalDetailService
  ) {
  }

  ngOnInit(): void {
    this.createPaymentAddForm();
    this.getCardsByCustomer();

  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      customerId: [this.authService.user.customerId],
      nameOnTheCard: ['', Validators.required],
      cardNumber: ['', Validators.required],
      dateMonth: ['', Validators.required],
      dateYear: ['', Validators.required],
      cvvCode: ['', Validators.required],
    });
  }

  completeThePayProcess() {
    if (this.paymentAddForm.valid) {
      let cardModel = Object.assign({}, this.paymentAddForm.value);
      this.paymentService.addRentalAfterPaymentAndCardInfoCompleted(cardModel);
    }
  }

  changeEvent(){
    if (this.checked ===true){
      this.paymentService.cardAddRequest = true;
    }else{
      this.paymentService.cardAddRequest = false;
    }
    return this.paymentService.cardAddRequest;
  }


  getCardsByCustomer(){
    this.cardService.getCardsByCustomer(this.authService.user.customerId).subscribe(response=>{
      this.savedCards = response.data
      console.log(response)
    })
  }

  getCardInfos(e:any){
    this.currentCard = this.savedCards.filter(x=> x.cardId == e.target.value)[0]
    this.paymentAddForm.patchValue(this.currentCard)
  }

}










//*******************************************************************************************************

//paymentService
// addRentalAfterPayment(payment: Payment) {
//   this.addPayment(payment).subscribe((response) => {
//     this.carRentalService.addRental(this.rental).subscribe(response=>{
//       this.toastrService.success('Success');
//     });
//   });
// }


//payment.component.ts
// addPayment() {
//   if (this.paymentAddForm.valid) {
//     this.paymentAddForm.value.cvvCode = Number(this.paymentAddForm.value.cvvCode)
//     let paymentModel = Object.assign({}, this.paymentAddForm.value);
//     this.paymentService.addRentalAfterPayment(paymentModel);
//   } else {
//     this.toastrService.error('Formunuz eksik', 'Dikkat');
//   }
