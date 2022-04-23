import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  dataLoaded = false;

  constructor(
    private colorService: ColorService,
    private router: Router,
    private brandService: BrandService,
    private authService:AuthService,
    private toastrService:ToastrService
  ) {

    this.brandService.statusUpdated.subscribe(() => {
      this.currentColor = { colorID: 0, colorName: '' };
    });
  }


  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }


  setCurrentColor(color: Color) {
    this.colorService.setCurrentColor(color);
  }


  getCurrentColorClass(color: Color) {
    if (this.currentColor == color) {
      return 'btn list-group-item list-group-item-dark collapse text-start';
    } else {
      return 'btn list-group-item collapse text-start';
    }
  }


  deleteColor(color:Color){
    if(window.confirm("Are you sure?")){
      this.colorService.deleteColor(color).subscribe(response =>{
        this.toastrService.success("Deleted.")
        window.location.reload();
      })
    }
    else{
      this.toastrService.error("Not Deleted.")
    }
  }



  doFilter(color: Color) {
    this.currentColor = color;
    this.router.navigate([''], {queryParams: { colorId: color.colorID }, queryParamsHandling: 'merge',});
  }

  isAuthenticated(){
    return this.authService.loggedIn()
  }

  isAdmin(){
    return this.authService.isAdmin()
  }
}
