import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent implements OnInit {
  carDetails: CarDetail[] = [];
  filterText='';
  dataLoaded = false;
  imageUrl:string="https://localhost:44388/"

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,private authService:AuthService
  ) {}

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params) => {
      this.getCarWithFilter(params['brandId'],params['colorId'],params['statuId']);
    });

  }


  getCarWithFilter(brandId?: number, colorId?: number, status?: number) {
    this.carService.getCarWithFilter(brandId, colorId, status).subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  isAdmin(){
    return this.authService.isAdmin()
  }

}
