import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarRental } from 'src/app/models/carRental';
import { CarRentalDetail } from 'src/app/models/carRentalDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { CarRentalDetailService } from 'src/app/services/carrentaldetail.service';
import { CustomerDetailService } from 'src/app/services/customerdetail.service';
import { PaymentService } from 'src/app/services/payment.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-carrentaldetail',
  templateUrl: './carrentaldetail.component.html',
  styleUrls: ['./carrentaldetail.component.css'],
})
export class CarrentaldetailComponent implements OnInit {
  @Input() car: CarDetail;
  carRentalDetails: CarRentalDetail[] = [];
  customerDetails: CustomerDetail[] = [];
  dataLoaded = false;
  customerId: number;
  rentDate: Date;
  returnDate: Date;
  totalPrice:number;
  minDate:string="";
  // eğer rentDate seçildiyse, returnDate i minimum o tarihe çekecek.
  state:number = 1;

  firstDateSelected:boolean= false; // rentDate seçili değilse, returnDate aktif olmayacak.


  constructor(
    private carRentalDetailService : CarRentalDetailService,
    private customerDetailService:CustomerDetailService,
    private paymentService: PaymentService,
    private authService : AuthService,
    private toastrService:ToastrService

  ) {}




  ngOnInit(): void {
    this.getCarRentalDetails();
    this.getCustomerDetails();
    this.minDate=new Date().toISOString().split("T")[0] // uzun bir tarih ve zaman bilgisi geldi onu split ile yalnızca tarih kısmını alacak şekilde böldük
    this.rentDate = new Date(this.minDate); // rentDate Date türünde olduğu için, string ütründeki minDate i Date türüne çevirdik.
  }


  getCarRentalDetails() {
    this.carRentalDetailService.getCarRentalDetails().subscribe((response) => {
      this.carRentalDetails = response.data;
      this.dataLoaded = true;
    });
  }


  getCustomerDetails() {
    this.customerDetailService.getCustomerDetails().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }


  addRentalCar() {
    let rental =<CarRental>{
      carId: this.car.carID,
      customerId: this.authService.user.customerId,
      rentDate: this.rentDate,
      returnDate: this.returnDate,
    };

    this.paymentService.setRental(rental);
    this.toastrService.success('Your rental request has been received. You are redirected to the payment page.');

      this.state =2;

  }


  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }


  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
  }

  totalAmount(date:any){
    let differance = new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime();
    let amount = new Date(differance).getDate();
    this.paymentService.totalPrice = amount * this.car.dailyPrice;
  }


}
