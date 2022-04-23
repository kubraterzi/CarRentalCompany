import { Component, OnInit } from '@angular/core';
import {BrandService} from '../../../../services/brand.service';
import {Brand} from '../../../../models/brand';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brand-edit',
  templateUrl: './brand-edit.component.html',
  styleUrls: ['./brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {

  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  brands:Brand[]=[];
  brand:Brand;
  brandDeleteForm:FormGroup;
  brandUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createBrandUpdateForm();
    this.createBrandDeleteForm();
  }

  ngDoCheck(){
    if (this.brand !== this.brandService.currentBrand){
      this.brand = this.brandService.currentBrand
      this.brandUpdateForm.patchValue(this.brand) // değer atamaya yardımcı olur
    }
  }


  createBrandDeleteForm(){
    this.brandDeleteForm= this.formBuilder.group({
      brandID : ['', Validators.required]
    })
  }


  createBrandUpdateForm(){
    this.brandUpdateForm= this.formBuilder.group({
      brandID :['', Validators.required],
      brandName:['', Validators.required],
      brandModel:['', Validators.required]
    })
  }




  updateBrand(){
    console.log(this.brandUpdateForm.value)
    if(this.brandUpdateForm.valid){
      let brandModel = Object.assign({}, this.brandUpdateForm.value)
      this.brandService.updateBrand(brandModel).subscribe(response => {
        console.log(brandModel)
        this.toastrService.success('Brand Updated')
        window.location.reload();
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }
}
