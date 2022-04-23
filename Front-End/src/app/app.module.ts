import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { CustomerdetailComponent } from './components/customerdetail/customerdetail.component';
import { CarrentaldetailComponent } from './components/carrentaldetail/carrentaldetail.component';
import { CarsComponent } from './components/cars/cars.component';
import { StatusComponent } from './components/status/status.component';

import { ToastrModule } from 'ngx-toastr';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {JwtModule} from '@auth0/angular-jwt';
import { BrandEditComponent } from './components/brand/brandEdit/brand-edit/brand-edit.component';
import { CarEditComponent } from './components/cars/carEdit/car-edit/car-edit.component';
import { ColorEditComponent } from './components/color/colorEdit/color-edit/color-edit.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { CarAddComponent } from './components/cars/carAdd/car-add/car-add.component';
import { BrandAddComponent } from './components/brand/brandAdd/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color/colorAdd/color-add/color-add.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    NaviComponent,
    CardetailComponent,
    CustomerdetailComponent,
    CarrentaldetailComponent,
    CarsComponent,
    StatusComponent,
    CarFilterPipe,
    PaymentComponent,
    LoginComponent,
    RegisterComponent,
    BrandEditComponent,
    CarEditComponent,
    ColorEditComponent,
    AdminEditComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"]
        //disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
