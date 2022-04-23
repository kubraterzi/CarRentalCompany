import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColorService} from '../../../../services/color.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;

  constructor(private colorService: ColorService, private formBuilder: FormBuilder, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.createColorAddForm();
  }


  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required]
    });
  }


  addColor() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastrService.success('Color Added');
        window.location.reload();
      });
    } else {
      this.toastrService.error('Form Invalid');
    }

  }
}
