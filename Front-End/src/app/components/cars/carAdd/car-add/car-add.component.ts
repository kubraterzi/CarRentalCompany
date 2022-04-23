import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../../../services/brand.service';
import {ColorService} from '../../../../services/color.service';
import {CarService} from '../../../../services/car.service';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../../../models/brand';
import {Color} from '../../../../models/color';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  brands: Brand[];
  colors: Color[];
  addCarForm:FormGroup;

  constructor(   private formBuilder: FormBuilder,
                 private brandService: BrandService,
                 private colorService: ColorService,
                 private carService: CarService,
                 private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createAddCarForm();
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


  createAddCarForm() {
    this.addCarForm = this.formBuilder.group({
      'brandID': ['', Validators.required],
      'colorID': ['', Validators.required],
      'modelYear': ['', Validators.required],
      'dailyPrice': ['', Validators.required],
      'description': ['', Validators.required]
    });
  }


  addCar(){
    if(this.addCarForm.valid){
      let carModel = Object.assign({}, this.addCarForm.value)
      this.carService.addCar(carModel).subscribe(response=>{
          this.toastrService.success('Added.')
        },error => {
          this.toastrService.error(error)
        }
      )
    }else{
      this.toastrService.error('Form invalid.')
    }
  }


}
