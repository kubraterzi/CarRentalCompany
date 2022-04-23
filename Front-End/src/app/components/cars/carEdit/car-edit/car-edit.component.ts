import {Component, Input, OnInit} from '@angular/core';
import {CarDetail} from '../../../../models/carDetail';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../../../services/brand.service';
import {Brand} from '../../../../models/brand';
import {ColorService} from '../../../../services/color.service';
import {Color} from '../../../../models/color';
import {CarService} from '../../../../services/car.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit {
  @Input() car: CarDetail;
  editCarForm: FormGroup;
  brands: Brand[];
  colors: Color[];
  state = 0;

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private colorService: ColorService,
    private carService: CarService,
    private toastrService: ToastrService
  ) {
  }


  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  ngDoCheck() {
    if (this.car) {
      if (this.state !== 1) {
        this.state = 1;
        this.createEditCarForm();
      }
    }
  }

  createEditCarForm() {
    this.editCarForm = this.formBuilder.group({
      'carID': [this.car.carID, Validators.required],
      'brandID': [this.car.brandID, Validators.required],
      'colorID': [this.car.colorID, Validators.required],
      'modelYear': [this.car.modelYear, Validators.required],
      'dailyPrice': [this.car.dailyPrice, Validators.required],
      'description': [this.car.description, Validators.required]
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe(res => {
      this.brands = res.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe(res => {
      this.colors = res.data;
    });
  }

  edit() {
    if(this.editCarForm.valid){
      let carModel = Object.assign({}, this.editCarForm.value)
      this.carService.updateCar(carModel).subscribe(response=>{
        this.toastrService.success('Updated.')
      },error => {
        this.toastrService.error(error)
        }
      )
    }else{
      this.toastrService.error('Form invalid.')
    }

  }
}
