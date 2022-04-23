import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BrandService} from '../../../../services/brand.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(private brandService:BrandService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }


  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:['', Validators.required],
      brandModel:['', Validators.required]
    })
  }


  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastrService.success('Brand Added')
        window.location.reload();
      })
    }else{
      this.toastrService.error('Form Invalid')
    }
  }

}
