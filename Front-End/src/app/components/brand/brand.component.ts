import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import {AuthService} from '../../services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  brands: Brand[] = [];
  currentBrand: Brand;
  dataLoaded = false;
  carDetails: CarDetail[] = [];

  constructor(
    private brandService: BrandService,
    private carService: CarService,
    private router:Router,
    private authService:AuthService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getBrands();
  }



  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getAllCars() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
    this.currentBrand={brandID:0,brandName:"", brandModel:""}
    // aşağıda yapılmak istenen, All Cars a tıklandığında, menüdeki seçili öğelerin aktivasyonu durdurulur.(mavi olarak seçili kalmasını engeller.)
    this.brandService.statusUpdated.emit(); // componentler arasında iletişim kurmayı sağlar. Bu metot tetiklendiğinde, color component in constructor ı  içerisindeki metot tetiklenir. böylelikle iki component arasında iletişim kurulmuş olur.
  }

  setCurrentBrand(brand: Brand) {
    this.brandService.setCurrentBrand(brand);
  }

  getCurrentBrandClass(brand: Brand) {
    if (brand == this.currentBrand) {
      return 'btn list-group-item list-group-item-dark collapse text-start';
    } else {
      return 'btn list-group-item collapse text-start';
    }


  }

  doFilter(brand:Brand){
    this.currentBrand = brand;
    this.router.navigate([''],{queryParams:{brandId:brand.brandID},queryParamsHandling:"merge"});
  }



  deleteBrand(brand:Brand){
    if(window.confirm("Are you sure?")){
      this.brandService.deleteBrand(brand).subscribe(response =>{
        this.toastrService.success("Deleted.")
        window.location.reload();
      })
    }
    else{
      this.toastrService.error("Not Deleted.")
    }
  }




  isAuthenticated(){
    return this.authService.loggedIn()
  }

  goToEdit(){
    this.router.navigate(['brandEdit'])
  }

  isAdmin(){
    return this.authService.isAdmin()
  }




}
