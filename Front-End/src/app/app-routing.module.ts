import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { PaymentComponent } from './components/payment/payment.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {BrandEditComponent} from './components/brand/brandEdit/brand-edit/brand-edit.component';
import {ColorEditComponent} from './components/color/colorEdit/color-edit/color-edit.component';
import {AdminEditComponent} from './components/admin-edit/admin-edit.component';

const routes: Routes = [
  {path:'' , pathMatch:'full', component:CarsComponent},
  {path:'cars', component:CarsComponent},
  // {path:'cars/brand/:brandId', component:CarsComponent},
  // {path:'cars/color/:colorId', component:CarsComponent},
  {path:'cars/detail/:carId', component:CardetailComponent},
  {path:'detail/:carId', component:CardetailComponent},
  {path:'brandEdit', component:BrandEditComponent},
  {path:'colorEdit', component:ColorEditComponent},
  {path:'adminEdit', component:AdminEditComponent},
  {path: 'login' , component:LoginComponent},
  {path: 'register' , component:RegisterComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
