import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Brand} from '../../../../models/brand';
import {ColorService} from '../../../../services/color.service';
import {Color} from '../../../../models/color';

@Component({
  selector: 'app-color-edit',
  templateUrl: './color-edit.component.html',
  styleUrls: ['./color-edit.component.css']
})
export class ColorEditComponent implements OnInit {

  constructor(private colorService:ColorService, private formBuilder:FormBuilder, private toastrService:ToastrService) { }

  colors:Color[]=[];
  colorId:number;
  color:Color;
  colorUpdateForm:FormGroup;

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.getColors()
  }

  ngDoCheck(){
    if (this.color !== this.colorService.currentColor){
      this.color = this.colorService.currentColor
      this.colorUpdateForm.patchValue(this.color) // değer atamaya yardımcı olur
    }
  }


  createColorUpdateForm(){
    this.colorUpdateForm= this.formBuilder.group({
      colorID : ['', Validators.required],
      colorName:['', Validators.required]
    })
  }


  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }



  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(response => {
        console.log(colorModel)
        this.toastrService.success('Color Deleted')
        window.location.reload();
      })

    }else{
      this.toastrService.error('Form Invalid')
    }
  }
}
